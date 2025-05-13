// Imports
import  express from "express";
import { DB } from '../../../dao/db.dao';

// Service import
import { InsertDataProfileService } from "../../../services/users/user/insertDataProfile.service";

// Interface import
import { ParamsCompleteProfile } from "../../../interfaces/user.interfaces";

// Controller class
export class CompleteProfileController{
    // Variables
    private db: DB;
    private insertDataProfileService: InsertDataProfileService;

    // Constructor
    constructor(db: DB){
        this.db = db;
        this.insertDataProfileService = new InsertDataProfileService(this.db);
    }

    // Controller function (control messages)
    async completeProfileController(req: express.Request, res: express.Response){
        try{
            // Extract data and build parameters
            const idUser: number = res.locals.idUser;
            const dataBody: ParamsCompleteProfile = {
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

            const completeData: boolean | null = await this.insertDataProfileService.insertDataProfile(idUser, dataBody);
            
            if(!completeData){
                res.status(400).send({ message: 'No se pudo completar el perfil, quizás debes actualizarlo'})
            }else{
                res.status(201).send({
                    message: 'Perfil de usuario completado correctamente',
                    data: null
                });
            }

        }catch(error){
             console.log('Error en CompleteProfileController: ', error);
            res.status(500).send( { message: 'Error interno del servidor' } );
        }
    }
}