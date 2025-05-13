// Import
import express, { NextFunction } from 'express';

// Validations import
import { allFieldsHaveValue } from '../../../utils/validations/allFieldHaveValue.valitadion';
import { areStringFields } from '../../../utils/validations/areStringFields.validation';
import { isCleanField } from '../../../utils/validations/isCleanField.validation';
import { hasInteriorSpaces } from '../../../utils/validations/hasInteriorSpaces.validation';
import { isValidEmailFormat } from '../../../utils/validations/isValidEmail.validation';
import { isValidPassFormat } from '../../../utils/validations/isValidPass.validation';
import { isValidRole } from '../../../common/validationsOnlyToProject/isValidRole.validationOTP';

// Middleware class
export class AddUserByAdminMiddleware{
    // Constructor
    constructor(){}

    // Middleware function
    addUserByAdminMiddleware(req: express.Request, res: express.Response, next: NextFunction):void{
        try{
            // Data
            const { email, provisionalPass, role} = req.body;
            const allfields = [ email, provisionalPass, role];

            // Validations
            // 1. Verify that the fields exits
            if(!allFieldsHaveValue(allfields)){
                console.error('Credenciales recibidas incorrectas/inválidas');
                res.status(400).send({message: 'Credenciales incorrectas / inválidas (1)'});
                return;
            }

            // 2. Verify that fields are strings
            if(!areStringFields(allfields)){
                console.error('Credenciales recibidas incorrectas/inválidas');
                res.status(400).send({message: 'Credenciales incorrectas / inválidas (2)'});
                return;
            }

            // 3. Verify that fields are clean of empty spaces at the beginning and end
            if(!isCleanField(email) || !isCleanField(provisionalPass)){
                console.error('Credenciales recibidas incorrectas/inválidas');
                res.status(400).send({message: 'Credenciales incorrectas / inválidas (3)'});
                return;
            }

            // 4. Verify that fields aren't interior spaces
            if(hasInteriorSpaces(email) || hasInteriorSpaces(provisionalPass)){
                console.error('Credenciales recibidas incorrectas/inválidas');
                res.status(400).send({message: 'Credenciales incorrectas / inválidas (4)'});
                return;
            }

            // 5. Verify that email format is correct
            if(!isValidEmailFormat(email)){
                console.error('Credenciales recibidas incorrectas/inválidas');
                res.status(400).send({message: 'Credenciales incorrectas / inválidas (5)'});
                return;
            }

            // 6. Verify that pass format is correct
            if(!isValidPassFormat(provisionalPass)){
                console.error('Credenciales recibidas incorrectas/inválidas');
                res.status(400).send({message: 'Credenciales incorrectas / inválidas (6)'});
                return;
            }

            // 7. Verify if "role" is a valid role in the system
            if (!isValidRole(role)) {
                console.error('Rol no reconocido en el sistema');
                res.status(400).send({ message: 'Credenciales incorrectas / inválidas (7)' });
                return;
            }

            console.log('AddUserByAdminMiddleware validado correctamente');
            next();

        }catch(error){
            console.error('Error inesperado en AddUserByAdminMiddleware: ', error);
            res.status(500).send({ message: 'Error interno del servidor' });
        }
    }
}