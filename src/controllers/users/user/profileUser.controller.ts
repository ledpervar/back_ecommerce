// Imports
import  express from "express";
import { DB } from '../../../dao/db.dao';

// Service import
import { GetProfileService } from "../../../services/users/user/getProfile.service";

// Interface import
import { ResponseGetProfileService } from '../../../interfaces/user.interfaces';

// Controller class
export class ProfileUserController{
    // Variables
    private db: DB;
    private getProfileService: GetProfileService;

    // Constructor
    constructor(db: DB){
        this.db = db;
        this.getProfileService = new GetProfileService(this.db);
    }

    // Controller function (control messages)
    async profileUserController(req: express.Request, res: express.Response){
        try{
            // Data
            const idUser: number = res.locals.idUser;

            const profileUser: ResponseGetProfileService | null = await this.getProfileService.getProfile(idUser);

            if(!profileUser){
                res.status(404).send({ message: 'No se pudo encontrar información de perfil de este usuario'});
            }else{
                res.status(200).send({ message: 'Perfil de usuario obtenido correctamente', data: profileUser});
                
            }

        }catch(error){
            console.log('Error en ProfileUserController: ', error);
            res.status(500).send( { message: 'Error interno del servidor' } );
        }
    }
}