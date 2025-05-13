// Imports
import  express, { NextFunction } from "express";
import { role } from "../../common/constants/roles.const";

// Validations imports
import { isValidRole } from "../../common/validationsOnlyToProject/isValidRole.validationOTP";
import { allFieldsHaveValue } from "../../utils/validations/allFieldHaveValue.valitadion";
import { areStringFields } from "../../utils/validations/areStringFields.validation";


// Middleware class
export class CheckRoleMiddleware{
    // Constructor
    constructor(){}
    
    // Middleware function (function inside other function)
    roleMiddleware(acceptedRoles: role[]){
        return (req: express.Request, res: express.Response, next: NextFunction) =>{
            try{
                // Extract data of res.locals
                const userRole: string = res.locals.role;

                // Validations
                // 1. Verify that the data exists
                if (!allFieldsHaveValue([userRole])) {
                    console.error('Rol no proporcionado o inválido');
                    res.status(403).send({ message: 'Acceso denegado' });
                    return;
                }

                // 2. Verify that data are of string type
                if (!areStringFields([userRole])) {
                    console.error('Rol no proporcionado o inválido');
                    res.status(403).send({ message: 'Acceso denegado' });
                    return;
                }

                // 3. Verify that the user role exits in the system
                if (!isValidRole(userRole)) {
                    console.error('Rol no proporcionado o inválido');
                    res.status(403).send({ message: 'Acceso denegado' });
                    return;
                }

                // 4. Verify that the user role have permission to the route
                if(!acceptedRoles.includes(userRole)){
                    console.error('Rol no proporcionado o inválido');
                    res.status(403).send({ message: 'Acceso denegado'});
                    
                }

                console.log('CheckRoleMiddleware validado correctamente: Acceso autorizado');
                next();

            }catch(error){
                console.error('Error inesperado en CheckRoleMiddleware:', error);
                res.status(500).send({ message: 'Error interno del servidor' });
            }
        }
    }   
}
