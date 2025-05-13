// Imports
import  express from "express";
import { DB } from '../../../dao/db.dao';

// Service import
import { GetAllUsersService } from "../../../services/users/users_management/getAllUsers.service";

// Interface import
import { GetAllUsersResult } from "../../../interfaces/user.interfaces";

// Controller class
export class ListUsersController {
    // Variables
    private db: DB;
    private getAllUsersService: GetAllUsersService;

    // Constructor
    constructor(db: DB){
        this.db = db;
        this.getAllUsersService = new GetAllUsersService(this.db);
    }

    // Controller function (messages control)
    async listUsersController(req: express.Request, res: express.Response){
        try{
            // Data from middleware
            const { limit, offset } = res.locals.pagination;

            // Call to service to get data of all users
            const infoUsersListResult: GetAllUsersResult[] | null = await this.getAllUsersService.getAllUsers(limit, offset);
            
            if (!infoUsersListResult || infoUsersListResult.length === 0) {
                res.status(404).send({ message: 'No se localizaron / encontraron usuarios en la base de datos' });
            } else {
                res.status(200).send({
                    message: 'Lista de usuarios obtenida correctamente',
                    data: infoUsersListResult
                });
            }

        }catch(error){
            console.error('Error en ListUsersController: ', error);
            res.status(500).send({message: 'Error interno del servidor'});
        }
    }
}