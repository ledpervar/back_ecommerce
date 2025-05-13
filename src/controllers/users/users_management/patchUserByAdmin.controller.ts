// Imports
import  express from "express";
import { DB } from '../../../dao/db.dao';

// Service import
import { UpdateUserByAdminService } from "../../../services/users/users_management/updateUserByAdmin.service";

// Interface import
import { ChangeRoleResult, ParamsUpdateUserByAdmin } from '../../../interfaces/user.interfaces';

// Controller class
export class PatchUserByAdminController{
    // Variables
    private db: DB;
    private updateUserByAdminService: UpdateUserByAdminService;

    // Constructor
    constructor(db:DB){
        this.db = db;
        this.updateUserByAdminService = new UpdateUserByAdminService(this.db);
    }

    // Controller function (control messages)
    async patchUserByAdminController(req: express.Request, res: express.Response){
        try{
            // Extract data and build parameters
            const parametersUpdateUserByAdmin: ParamsUpdateUserByAdmin ={
                idUserToUpdate: parseInt(req.params.id, 10),
                roleToUpdate: req.body.role
            };

            const updatedRole: ChangeRoleResult | null = await this.updateUserByAdminService.updateUserByAdmin(parametersUpdateUserByAdmin);

            if (!updatedRole) {
                res.status(400).send({ message: 'Error: no se ha podido actualizar el rol de usuario' });
              } else {
                res.status(201).send({
                  message: 'Usuario actualizado correctamente',
                  data: updatedRole,
                });
            }

        }catch(error){
            console.log('Error en PatchUserByAdminController: ', error);
            res.status(500).send( { message: 'Error interno del servidor' } );
        }
    }
}