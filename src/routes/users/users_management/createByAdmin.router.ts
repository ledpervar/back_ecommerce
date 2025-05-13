// Imports
import express, { Router } from "express";
import { DB } from "../../../dao/db.dao";

// Middleware imports
import { AuthTokenMiddleware } from "../../../middlewares/auth/authToken.middleware";
import { CheckRoleMiddleware } from "../../../middlewares/auth/checkRole.middleware";
import { AddUserByAdminMiddleware } from "../../../middlewares/users/users_management/addUserByAdmin.middleware";

// Controller import
import { AddUserByAdminController } from "../../../controllers/users/users_management/addUserByAdmin.controller";

// Router
export class CreateByAdminRouter{
    // Variable
    private db: DB;

    // Constructor
    constructor(db: DB){
        this.db = db;
    }

    public configureRoutes(): Router{
        const router = express.Router();

        // Middlewares
        const authTokenMiddlew = new AuthTokenMiddleware();
        const checkRoleMiddlew = new CheckRoleMiddleware();
        const addUserByAdminMiddlew = new AddUserByAdminMiddleware();

        // Controller
        const addUserByAdminContro = new AddUserByAdminController(this.db);

        // Route
        router
            .route('/')
            .all(authTokenMiddlew.verifyToken)
            .post(
                checkRoleMiddlew.roleMiddleware(['admin', 'subadmin']),
                addUserByAdminMiddlew.addUserByAdminMiddleware,
                (req: express.Request, res: express.Response) => {
                    addUserByAdminContro.addUserByAdminController(req, res)
                }
            ); 
        return router;
    }
}