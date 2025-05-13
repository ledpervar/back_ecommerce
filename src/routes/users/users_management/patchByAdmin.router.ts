// Imports
import express, { Router } from "express";
import { DB } from "../../../dao/db.dao";

// Middleware imports
import { AuthTokenMiddleware } from "../../../middlewares/auth/authToken.middleware";
import { CheckRoleMiddleware } from "../../../middlewares/auth/checkRole.middleware";
import { UpdateUserByAdminMiddleware} from "../../../middlewares/users/users_management/updateUserByAdmin.middleware";

// Controller import
import { PatchUserByAdminController } from "../../../controllers/users/users_management/patchUserByAdmin.controller";

// Router
export class PatchByAdminRouter{
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
        const updateUserByAdminMiddlew = new UpdateUserByAdminMiddleware();

        // Controller
        const patchUserByAdminContro = new PatchUserByAdminController(this.db);

        // Route
        router
        .route('/:id')
            .all(authTokenMiddlew.verifyToken)
            .patch(
                checkRoleMiddlew.roleMiddleware(['admin', 'subadmin']),
                updateUserByAdminMiddlew.updateUserByAdminMiddleware,
                (req: express.Request, res: express.Response) => {
                    patchUserByAdminContro.patchUserByAdminController(req, res)
                }
            ); 
        return router;
    }
}