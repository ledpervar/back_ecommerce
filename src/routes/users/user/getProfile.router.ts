// Imports
import express, { Router } from "express";
import { DB } from "../../../dao/db.dao";

// Middleware import
import { AuthTokenMiddleware } from "../../../middlewares/auth/authToken.middleware";

// Controller import
import { ProfileUserController } from "../../../controllers/users/user/profileUser.controller";

// Router
export class GetProfileRouter{
    // Variable
    private db: DB;

    // Constructor
    constructor(db: DB){
        this.db = db;
    }

    public configureRoutes(): Router{
        const router = express.Router();

        // Middleware
        const authTokenMiddlew = new AuthTokenMiddleware();

        // Controller
        const profileUserContro = new ProfileUserController(this.db);

        // Route
        router
            .route('/')
            .all(authTokenMiddlew.verifyToken)
            .get(
                (req: express.Request, res: express.Response) =>{
                    profileUserContro.profileUserController(req, res);
                }
            );
        return router;
    }
}