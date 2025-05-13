// Import
import express, { NextFunction } from 'express'
import { DB } from "../../dao/db.dao";


// Middleware class
export class HistoricalAction{
    // Variable
    private db: DB;
    
    // Constructor
    constructor(db:DB){
        this.db = db;
    }

    // Middleware function
    /// Insert action
    writeAction = async (req: express.Request, res: express.Response, next: NextFunction )=>{  
        try {
            // Insert in database
            const dataHistorical = await this.db.queryPool(
                `INSERT INTO actions_logs (id_user, email, role, action_type) VALUES (?, ? ,? ,?)`,
                [
                res.locals.idUser?res.locals.idUser:0,
                req.body.email_login,
                res.locals.role?res.locals.role:'user',
                req.method + ' ' + req.baseUrl
                ]
            );

            // Validate if the action has been registered in the database table and we obtain its id
            if(dataHistorical.insertId > 0){
                res.locals.idHistorical = dataHistorical.insertId;
            }else{
                console.log('Error al guardar historico en login con datos: ',
                    res.locals.idUser?res.locals.idUser:0,
                    req.body.email_login,
                    res.locals.role?res.locals.role:'user',
                    req.method + ' '+ req.baseUrl
                 );
            }
            next();

        } catch (error: any) {
            console.log(error.message);
            res.status(500).send({message: 'Error interno del servidor' } )
        }
    }
    
    /// Update the action and complete all data
    updateAction = async(updateObject: any)=>{
        try {
            const dataUpdate: any = await this.db.queryPool(
                `UPDATE actions_logs SET id_user = ?, state = ?, role = ? WHERE id = ?`,
                [
                updateObject.idUser,
                1,
                updateObject.role,
                updateObject.idHistorical
                ]
            );
            
        } catch (error:any) {
            console.log('Error al actualizar el historico de acciones');
            console.log(error.message);
            
        }
    }
}