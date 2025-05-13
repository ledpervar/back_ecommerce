// Token import
import jwt from 'jsonwebtoken';

// Import
import { DB } from '../../dao/db.dao';
import bcrypt from 'bcrypt';

// Interface imports
import { ParamsLogin, 
         ResultCallDB,
         DataUser_token } from '../../interfaces/auth.interfaces';
import { HistoricalAction } from '../../middlewares/historicalAction/historicalAction.middleware';

// Service class
export class LoginService{
    // Variable
    private db: DB;
    private historicalAction : HistoricalAction;

    // Constructor
    constructor(db: DB){
        this.db = db;
        this.historicalAction = new HistoricalAction(this.db);
    }

    // Logic, service function
    login = async (parametersLogin: ParamsLogin) =>{
        try{
            // Variables
            const { email_login, pass_login } = parametersLogin;

            // Call to database
            let userExist: ResultCallDB[] = await this.db.queryPool(
                'SELECT id, pass, role FROM users WHERE email = ?',
                [email_login]
            );

            // Verify that the call has data
            if(userExist.length <= 0){
                console.log ('Usuario no encontrado o inexistente ', email_login);
                return null;
            } 

            // Reassign userExits to be the first user
            const actualUser: ResultCallDB = userExist[0];

            // Compare the pass with bcrypt
            const match = await bcrypt.compare(pass_login, actualUser.pass);
            if(!match){
                console.log('contraseña incorrecta');
                return null;
            }

            // Verify secret key
            const jwtSecret: string = process.env.JWT_SECRET ?? '';
            if (!jwtSecret || jwtSecret === ''){
                console.error('JWT_SECRET no configurado');
                return null;
            } 

            // If we have jwtSecret, insert data in token and generate 
            const dataPayload: DataUser_token ={
                id: actualUser.id,
                role: actualUser.role
            } 

            // Sign the token
            const token: string = jwt.sign(
                    dataPayload,
                    jwtSecret,
                    { expiresIn: '24h'});
            

            const updateObjectHistoricalAction : any = {
                idHistorical : parametersLogin.idHistorical,
                idUser:  dataPayload.id,
                role : dataPayload.role
            }       
            await this.historicalAction.updateAction(updateObjectHistoricalAction); 

            return { token, role: actualUser.role };

        }catch(error){
            console.error('Error en LoginService: ', error);
            return null;
        }
    }
}
