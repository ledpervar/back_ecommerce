// Imports
import express, { Router } from "express";
import { DB } from "../../../dao/db.dao";

// Middleware imports
import { AuthTokenMiddleware } from "../../../middlewares/auth/authToken.middleware";
import { CheckRoleMiddleware } from "../../../middlewares/auth/checkRole.middleware";
import { PaginationMiddleware } from "../../../middlewares/commonMiddlewares/pagination.middleware";

// Controller import
import { ListUsersController } from "../../../controllers/users/users_management/listUsers.controller";

// Router
export class AllUsersRouter{
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
        const checkRoleMiddlew = new CheckRoleMiddleware();
        const paginationMiddlew = new PaginationMiddleware();
        
        // Controller
        const listUsersContro = new ListUsersController(this.db);

        // Route
        router
            .route('/')
            .all(authTokenMiddlew.verifyToken)
            .get(
                checkRoleMiddlew.roleMiddleware(['admin', 'subadmin']),
                paginationMiddlew.paginationMiddleware,
                (req: express.Request, res: express.Response) => {
                    listUsersContro.listUsersController(req, res);
                }
            )
        return router;

    }
}