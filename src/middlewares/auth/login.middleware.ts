// Import
import express, { NextFunction } from 'express';

// Validations imports
import { allFieldsHaveValue } from '../../utils/validations/allFieldHaveValue.valitadion';
import { areStringFields } from '../../utils/validations/areStringFields.validation';
import { isCleanField } from '../../utils/validations/isCleanField.validation';
import { hasInteriorSpaces } from '../../utils/validations/hasInteriorSpaces.validation';
import { isValidEmailFormat } from '../../utils/validations/isValidEmail.validation';

// Middleware class
export class LoginMiddleware{
    // Constructor
    constructor(){}

    // Middleware function
    loginMiddleware(req: express.Request, res: express.Response, next: NextFunction): void {
        try{
            // Data
            const { email_login , pass_login } = req.body;
            const fields = [ email_login, pass_login];

            // Validations
            // 1. Verify that the fields exits
            if(!allFieldsHaveValue(fields)){
                console.error('Credenciales recibidas incorrectas/inválidas');
                res.status(400).send({message: 'Credenciales incorrectas / inválidas (1)'});
                return;
            }

            // 2. Verify that fields are strings
            if(!areStringFields(fields)){
                console.error('Credenciales recibidas incorrectas/inválidas');
                res.status(400).send({message: 'Credenciales incorrectas / inválidas (2)'});
                return;
            }

            // 3. Verify that fields are clean of empty spaces at the beginning and end
            if(!isCleanField(email_login) || !isCleanField(pass_login)){
                console.error('Credenciales recibidas incorrectas/inválidas');
                res.status(400).send({message: 'Credenciales incorrectas / inválidas (3)'});
                return;
            }

            // 4. Verify that fields aren't interior spaces
            if(hasInteriorSpaces(email_login) || hasInteriorSpaces(pass_login)){
                console.error('Credenciales recibidas incorrectas/inválidas');
                res.status(400).send({message: 'Credenciales incorrectas / inválidas (4)'});
                return;
            }

            // 5. Verify that email format is correct
            if(!isValidEmailFormat(email_login)){
                console.error('Credenciales recibidas incorrectas/inválidas');
                res.status(400).send({message: 'Credenciales incorrectas / inválidas (5)'});
                return;
            }

            console.log('LoginMiddleware validado correctamente');
            next();

        }catch(error){
            console.error('Error inesperado en LoginMiddleware:', error);
            res.status(500).send({ message: 'Error interno del servidor' });
        }
    }
}

