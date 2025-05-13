// Imports
import express, { Router } from "express";
import { DB } from "../../dao/db.dao";

// Middleware import
import { RegisterMiddleware } from "../../middlewares/auth/register.middleware";

// Controller import
import { RegisterController } from "../../controllers/auth/register.controller";

// Router
export class RegisterRouter{
    // Variables
    private db: DB;

    // Constructor
    constructor(db: DB){
        this.db = db;
    }

    public configureRoutes(): Router{
        const router = express.Router(); 

        // Middleware
        const registerMiddle = new RegisterMiddleware();

        // Controller
        const registerContro = new RegisterController(this.db);

        // Route
        router
            .route('/')
            .all(registerMiddle.registerMiddleware)
            .post((req: express.Request, res: express.Response)=>{
                registerContro.registerController(req, res);
            });
        
        return router;
    }
}