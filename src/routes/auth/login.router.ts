// Imports
import express, { Router } from "express";
import { DB } from "../../dao/db.dao";

// Middleware import
import { LoginMiddleware } from "../../middlewares/auth/login.middleware";
import { HistoricalAction } from "../../middlewares/historicalAction/historicalAction.middleware"

// Controller import
import { LoginController } from "../../controllers/auth/login.controller";

// Router
export class LoginRouter{
    // Variables
    private db: DB;

    // Constructor
    constructor(db: DB){
        this.db = db;
    }

    public configureRoutes(): Router{
        const router = express.Router(); 

        // Middleware
        const loginMiddle = new LoginMiddleware();
        const historicalAction : HistoricalAction = new HistoricalAction(this.db);

        // Controller
        const loginContro = new LoginController(this.db);

        // Route
        router
            .route('/')
            .all(loginMiddle.loginMiddleware, historicalAction.writeAction)
            .post((req: express.Request, res: express.Response)=>{
                loginContro.loginController(req, res);
            });
        
        return router;
    }
}