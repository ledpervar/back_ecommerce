// Imports
import  express from "express";
import { DB } from '../../../dao/db.dao';

// Service import
import { GetUserByIdService } from "../../../services/users/users_management/getUserById.service";

// Interface import
import { GetUserByIdResult } from "../../../interfaces/user.interfaces";

// Controller class
export class GetInfoUserController{
    // Variables
    private db: DB;
    private getUserByIdService: GetUserByIdService;

    // Constructor
    constructor(db: DB){
        this.db = db;
        this.getUserByIdService = new GetUserByIdService(this.db);
    }

    // Controller function (messages control)
    async getInfoUserController(req: express.Request, res: express.Response){
        try{
            // Data from middleware (extract from URL, beacause the manager access to the 
            // info of other user that don't be himself)
            const idUser: number = parseInt(req.params.id); 

            // Call to service to get the information
            const info: GetUserByIdResult | null = await this.getUserByIdService.getUserById(idUser);

            // Control of messages
            if (!info) {
                res.status(404).send({ message: 'No se encontró el usuario con el ID proporcionado' });
            } else {
                res.status(200).send({
                    message: 'Información del usuario obtenida correctamente',
                    data: info
                });
            }

        }catch(error){
            console.error('Error en GetInfoUserController: ', error);
            res.status(500).send({message: 'Error interno del servidor'});
        }
    }
}