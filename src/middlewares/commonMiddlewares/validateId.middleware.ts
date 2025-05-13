// Import
import express, { NextFunction } from 'express';

// Validation import
import { isValidPositiveInteger } from '../../utils/validations/isValidPositiveInteger.validation';

// Middleware class
export class ValidateIdMiddleware{
    // Constructor
    constructor(){}

    // Middleware function
    validateIdMiddleware(req: express.Request, res: express.Response, next: NextFunction): void {
        try{
            // Extract data
            const id = req.params.id;

            // Verify that this ID has the correct format
            if (!isValidPositiveInteger(id)) {
                console.error(`Recibido un ID inválido / incorrecto`);
                res.status(400).send({ message: 'Formato de parámetro ID incorrecto' });
                return;
            }

            console.log('ID validado correctamente');
            next();
          
        }catch(error){
            console.error('Error inesperado en ValidateIdMiddleware:', error);
            res.status(500).send({ message: 'Error interno del servidor' });
        }
    }
}