// Imports
import  express from "express";
import { DB } from '../../../dao/db.dao';

// Service import
import { UpdateDataProfileService } from "../../../services/users/user/updateDataProfile.service";

// Interface import
import { ParamsUpdateProfile } from "../../../interfaces/user.interfaces";

// Controller class
export class PatchProfileController{
    // Variables
    private db: DB;
    private updateDataProfileService: UpdateDataProfileService;

    // Constructor
    constructor(db: DB){
        this.db = db;
        this.updateDataProfileService = new UpdateDataProfileService(this.db);
    }

    // Controller function (control messages)
    async patchProfileController(req: express.Request, res: express.Response){
        try{
            // Extract data and build parameters
            const idUser: number = res.locals.idUser;
            const dataUpdateProfile: ParamsUpdateProfile = {
                name: req.body.name,
                surname: req.body.surname,
                address: req.body.address,
                postal_code: req.body.postal_code,
                province: req.body.province,
                locality: req.body.locality,
                identity_document_type: req.body.identity_document_type,
                document_number: req.body.document_number,
                telephone: req.body.telephone
            };

            const patchUserdata: boolean | null = await this.updateDataProfileService.updateDataProfile(idUser, dataUpdateProfile);

            if(!patchUserdata){
                res.status(400).send({ message: 'No se pudo actualizar los datos de perfil'});
            }else{
                res.status(201).send({
                    message: 'Perfil de usuario actualizado correctamente',
                    data: null
                });
            }

        }catch(error){
            console.log('Error en PatchProfileController: ', error);
            res.status(500).send( { message: 'Error interno del servidor' } );
        }
    }
}