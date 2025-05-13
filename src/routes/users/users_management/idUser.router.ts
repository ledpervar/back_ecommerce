// Imports
import express, { Router } from "express";
import { DB } from "../../../dao/db.dao";

// Middleware imports
import { AuthTokenMiddleware } from "../../../middlewares/auth/authToken.middleware";
import { CheckRoleMiddleware } from "../../../middlewares/auth/checkRole.middleware";
import { ValidateIdMiddleware } from "../../../middlewares/commonMiddlewares/validateId.middleware";

// Controller import
import { GetInfoUserController } from "../../../controllers/users/users_management/getInfoUser.controller";

// Router
export class IdUserRouter{
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
        const validateIdMiddlew = new ValidateIdMiddleware();

        // Controller
        const getInfoUserContro = new GetInfoUserController(this.db);

        // Route
        router
            .route('/:id')
            .all(authTokenMiddlew.verifyToken)
            .get(
                checkRoleMiddlew.roleMiddleware(['admin', 'subadmin']),
                validateIdMiddlew.validateIdMiddleware,
                (req: express.Request, res: express.Response) => {
                    getInfoUserContro.getInfoUserController(req, res);
                }
            );
        return router;
    }
}