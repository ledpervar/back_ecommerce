// Import
import express, { NextFunction } from 'express';

// Validations imports
import { allFieldsHaveValue } from '../../utils/validations/allFieldHaveValue.valitadion';
import { areStringFields } from '../../utils/validations/areStringFields.validation';
import { isCleanField } from '../../utils/validations/isCleanField.validation';
import { hasInteriorSpaces } from '../../utils/validations/hasInteriorSpaces.validation';
import { isValidEmailFormat } from '../../utils/validations/isValidEmail.validation';
import { isValidPassFormat } from '../../utils/validations/isValidPass.validation';

// Middleware class
export class RegisterMiddleware{
    // Constructor
    construtor(){}

    // Middleware function
    registerMiddleware(req: express.Request, res: express.Response, next: NextFunction): void{
        try{
            // Data
            const { email_register, pass_register, confirmPass_register } = req.body;
            const allfields = [ email_register, pass_register, confirmPass_register ];

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
            if(!isCleanField(email_register) || !isCleanField(pass_register) || !isCleanField(confirmPass_register)){
                console.error('Credenciales recibidas incorrectas/inválidas');
                res.status(400).send({message: 'Credenciales incorrectas / inválidas (3)'});
                return;
            }

            // 4. Verify that fields aren't interior spaces
            if(hasInteriorSpaces(email_register) || hasInteriorSpaces(pass_register) || hasInteriorSpaces(confirmPass_register)){
                console.error('Credenciales recibidas incorrectas/inválidas');
                res.status(400).send({message: 'Credenciales incorrectas / inválidas (4)'});
                return;
            }

            // 5. Verify that email format is correct
            if(!isValidEmailFormat(email_register)){
                console.error('Credenciales recibidas incorrectas/inválidas');
                res.status(400).send({message: 'Credenciales incorrectas / inválidas (5)'});
                return;
            }

            // 6. Verify that pass format is correct
            if(!isValidPassFormat(pass_register)){
               console.error('Credenciales recibidas incorrectas/inválidas');
               res.status(400).send({message: 'Credenciales incorrectas / inválidas (6)'});
               return;
            }

            // 7. Verify that the fields of pass and confirmPass match
            if(pass_register !== confirmPass_register){
                console.error('Credenciales recibidas incorrectas/inválidas');
                res.status(400).send({message: 'Credenciales incorrectas / inválidas (7)'});
                return;
            }

            console.log('RegisterMiddleware validado correctamente');
            next();

        }catch(error){
            console.error('Error inesperado en RegisterMiddleware: ', error);
            res.status(500).send({ message: 'Error interno del servidor' });
        }
    }
}