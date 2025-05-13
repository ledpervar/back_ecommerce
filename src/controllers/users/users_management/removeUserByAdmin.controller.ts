// Imports
import express, { NextFunction } from 'express';
import { DB } from '../../../dao/db.dao';

// Service import
import { DeleteUserByAdminService } from '../../../services/users/users_management/deleteUserByAdmin.service';

// Interface import
import { ParamsDeleteUserByAdmin, SoftDeleteResult } from '../../../interfaces/user.interfaces';

// Controller class
export class RemoveUserByAdminController{
    // Variables
    private db: DB;
    private deleteUserByAdminService: DeleteUserByAdminService;

    // Constructor
    constructor(db: DB){
        this.db = db;
        this.deleteUserByAdminService = new DeleteUserByAdminService(this.db);
    }

    // Controller function (control messages)
    async removeUserByAdminController(req: express.Request, res: express.Response, next: NextFunction){
        try{
            // Extract data and build parameters
            const parametersDeleteUserByAdmin: ParamsDeleteUserByAdmin = {
                idUserToDelete: parseInt(req.params.id, 10),
                idManager: res.locals.idUser,
                managerRole: res.locals.role as "admin" | "subadmin" | "store_manager",
                reason: req.body.reason
            };

            // Call the service to delete the user
            const responseServiceDeleteUser: SoftDeleteResult | boolean | null = await this.deleteUserByAdminService.deleteUserByAdmin(parametersDeleteUserByAdmin);

            if (!responseServiceDeleteUser) {
                res.status(400).send({ message: 'No se pudo eliminar el usuario.' });
            } else {
                res.status(200).send({ message: 'Usuario inactivo. Eliminada su actividad correctamente' });
            }

        }catch(error){
            console.log('Error en RemoveUserByAdminController: ', error);
            res.status(500).send( { message: 'Error interno del servidor' } );
        }
    }
}
