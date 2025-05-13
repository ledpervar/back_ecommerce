// Imports
import { DB } from '../../dao/db.dao';
import bcrypt from 'bcrypt';

// Interface imports
import { ParamsRegister, UserCheck, ResponseServiceRegister } from '../../interfaces/auth.interfaces';
import { HistoricalAction } from '../../middlewares/historicalAction/historicalAction.middleware';

// Service class
export class RegisterService{
    // Variables
    private db: DB;
    private saltRounds: number = 10;
    private historicalAction : HistoricalAction;

    // Constructor
    constructor(db: DB){
        this.db = db;
        this.historicalAction = new HistoricalAction(this.db);
    }

    // Logic, service function
    register = async (parametersRegister: ParamsRegister) =>{
        try{
            // Variables
            const { email_register, pass_register, idHistorical } = parametersRegister;
            
            /// Service verifications
            // Verify that the new user doesn´t exist in database
            const checkUser: UserCheck[] = await this.db.queryPool(
                'SELECT id FROM users WHERE email = ?', 
                [email_register]
            );

            // Verify that the call haven't data
            if (checkUser.length > 0){
                console.log ('Este usuario ya existe', email_register);
                return null;
            }

            // Encrypt the pass
            const hashedPass: string = await bcrypt.hash(pass_register, this.saltRounds);

            // Insert in database the new user in the user table
            const insertUserRegister = await this.db.queryPool(
                'INSERT INTO users (email, pass, role, created_at) VALUES (?, ?, ?, NOW())',
                [email_register, hashedPass, 'user']
            );

            const insertUserId = insertUserRegister.insertId;
            const role = 'user';

            // Update the table of actions_logs
            if (idHistorical) {
                const updateObjectHistoricalAction: any = {
                    idHistorical: parametersRegister.idHistorical,
                    id_newUser: insertUserId,
                    email: parametersRegister.email_register,
                    role: 'user'
                };
                await this.historicalAction.updateAction(updateObjectHistoricalAction);
            }

            return { id_newUser: insertUserId };
            
        }catch(error){
            console.error('Error en RegisterService: ', error);
            return null;
        }
    } 
}