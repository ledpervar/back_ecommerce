// Imports
import  express from "express";
import { DB } from '../../../dao/db.dao';

// Service import
import { CreateUserByAdminService } from "../../../services/users/users_management/createUserByAdmin.service";

// Interface import
import { ParamsCreateUserByAdmin, CreateUserByAdminResult } from "../../../interfaces/user.interfaces";

// Controller class
export class AddUserByAdminController{
    // Variables
    private db: DB;
    private createUserByAdminService: CreateUserByAdminService;

    // Constructor
    constructor(db: DB){
        this.db = db;
        this.createUserByAdminService = new CreateUserByAdminService(this.db);
    }

    // Controller function (control messages)
    async addUserByAdminController(req: express.Request, res: express.Response){
        try{
            // Extract data and build parameters
            const parametersCreateUserByAdmin: ParamsCreateUserByAdmin = {
                email: req.body.email,
                provisionalPass: req.body.provisionalPass,
                role: req.body.role
            };

            const newUser: CreateUserByAdminResult | null = await this.createUserByAdminService.createUserByAdmin(parametersCreateUserByAdmin);

            if (!newUser) {
                res.status(400).send({ message: 'No se pudo crear el usuario' });
            } else {
                res.status(201).send({
                  message: 'Usuario creado correctamente',
                  data: newUser.id
                });
            }

        }catch(error){
            console.log('Error en AddUserByAdminController: ', error);
            res.status(500).send( { message: 'Error interno del servidor' } );
        }
    }
}