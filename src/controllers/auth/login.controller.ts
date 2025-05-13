// Imports
import  express from "express";
import { DB } from '../../dao/db.dao';

// Service import
import { LoginService } from "../../services/auth/login.service";

// Interface import
import { ParamsLogin, ResponseServiceLogin } from "../../interfaces/auth.interfaces";

// Controller class
export class LoginController{
    // Variables
    private db: DB;
    private loginService: LoginService;

    // Constructor
    constructor(db:DB){
        this.db = db;
        this.loginService = new LoginService(this.db);
    }

    // Controller function (messages control)
    async loginController(req: express.Request, res: express.Response){
        try{
            // Extract the data of petition
            const parametersLogin : ParamsLogin = {
                email_login: req.body.email_login,
                pass_login: req.body.pass_login,
                idHistorical: Number(res.locals.idHistorical)
            };

            // Call to service and responses
            const responseService: ResponseServiceLogin | null = await this.loginService.login(parametersLogin);
            if(!responseService || responseService === null){
                res.status(401).send({ message: 'Credenciales inválidas / Error en el servicio de logueo'});
            }else{
                res.status(200).send({ message: responseService});
            }

        }catch(error){
            console.error('Error en LoginController: ', error);
            res.status(500).send({message: 'Error interno del servidor'});
        }
    }
}