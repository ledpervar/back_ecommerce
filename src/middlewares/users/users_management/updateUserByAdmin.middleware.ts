// Import
import express, { NextFunction } from 'express';

// Validations import 
import { allFieldsHaveValue } from '../../../utils/validations/allFieldHaveValue.valitadion';
import { isValidPositiveInteger } from '../../../utils/validations/isValidPositiveInteger.validation';
import { isValidRole } from '../../../common/validationsOnlyToProject/isValidRole.validationOTP';

// Middleware class
export class UpdateUserByAdminMiddleware{
    // Constructor
    constructor(){}

    // Middleware function
    updateUserByAdminMiddleware(req: express.Request, res: express.Response, next: NextFunction): void{
        try{
            // Data
            const roleToUpdate = req.body.role;
            const idUserToUpdate = parseInt(req.params.id, 10);
            const allfields = [ idUserToUpdate, roleToUpdate];

            // Validations
            // 1. Verify that the data fields exits
            if(!allFieldsHaveValue(allfields)){
                console.error('Credenciales recibidas incorrectas/inválidas');
                res.status(400).send({message: 'Credenciales incorrectas / inválidas (1)'});
                return;
            }

            // 2. Verify that this ID has the correct format
            if (!isValidPositiveInteger(idUserToUpdate)) {
                console.error(`Recibido un ID inválido / incorrecto`);
                res.status(400).send({ message: 'Formato de parámetro ID incorrecto' });
                return;
            }

            // 3. Verify that the user role exits in the system
            if (!isValidRole(roleToUpdate)) {
                console.error('Rol no proporcionado o inválido');
                res.status(403).send({ message: 'Rol incorrecto / inválido' });
                return;
            }

            console.log('UpdateUserByAdminMiddleware validado correctamente');
            next();

        }catch(error){
            console.error('Error inesperado en UpdateUserByAdminMiddleware: ', error);
            res.status(500).send({ message: 'Error interno del servidor' });
        }
    }
}