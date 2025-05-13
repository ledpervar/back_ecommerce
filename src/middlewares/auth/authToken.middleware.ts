// Imports
import jwt from 'jsonwebtoken';
import  express, { NextFunction } from "express";

// Type import
import { role } from '../../common/constants/roles.const';

// Interface import
import { TokenPayload } from '../../interfaces/auth.interfaces';

// Validations imports
import { areStringFields } from '../../utils/validations/areStringFields.validation';
import { isTokenPayload } from '../../utils/guards/isTokenPayload.guard';

// Middleware class
export class AuthTokenMiddleware{
    // Constructor
    constructor(){}

    // Middleware dunction
    verifyToken (req:express.Request, res: express.Response, next: NextFunction): void{
        try{
            // Extract the header
            const authHeader: string | string[] | undefined = req.headers['authorization'];

            // Verify the header format
            if(!authHeader || !areStringFields([authHeader]) || !authHeader.startsWith('Bearer ')){
                res.status(401).send({ message: 'No autorizado' });
                return;
            }

            // Extract the token
            const token: string | undefined = authHeader?.split(' ')[1];
            if(!token){
                res.status(401).send({ message: 'No autorizado' });
                return;
            }

            // Verify and decoded of the token
            const jwtSecret: string = process.env.JWT_SECRET ?? '';
            const decodedToken : TokenPayload = jwt.verify(token, jwtSecret) as TokenPayload;

            // Verify of decoded token format
            if(isTokenPayload(decodedToken)){
                res.locals.idUser = decodedToken.id;
                res.locals.role = decodedToken.role as role;
                next();

            } else {
                res.status(401).send({ message: 'No autorizado' });
                return;
            }

        }catch(error){
            console.error('Error inesperado en AuthTokenMiddleware:', error);
            res.status(401).send({ message: 'No autorizado' });
        }
    }
}