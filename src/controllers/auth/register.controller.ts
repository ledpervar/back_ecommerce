// Imports
import  express from "express";
import { DB } from '../../dao/db.dao';

// Service import
import { RegisterService } from "../../services/auth/register.service";

// Interface import
import { ParamsRegister, ResponseServiceRegister } from '../../interfaces/auth.interfaces';

// Controller class
export class RegisterController{
    // Variables
    private db: DB;
    private registerService: RegisterService;

    // Constructor()
    constructor(db: DB){
        this.db = db;
        this.registerService = new RegisterService(this.db);
    }

    // Controller function (messages control)
    async registerController(req: express.Request, res: express.Response){
        try{
            // Extract the data of petition
            const parametersRegister: ParamsRegister = {
                email_register: req.body.email_register,
                pass_register: req.body.pass_register,
                idHistorical: Number(res.locals.idHistorical)
            };

            // Call to service and show the responses
            const responseService: ResponseServiceRegister | null = await this.registerService.register(parametersRegister);
            if (responseService === null) {
                res.status(400).send({ message: 'Credenciales inválidas / Error en el servicio de registro' });
            } else {
                res.status(201).send({
                  message: 'Usuario creado correctamente',
                  id: responseService.id_newUser
                });
            }

        }catch(error){
            console.error('Error en RegisterController: ', error);
            res.status(500).send({ message: 'Error interno del servidor'});
        }
    }
}