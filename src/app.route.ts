// Imports
import express from 'express';
import { DB } from './dao/db.dao';

// Routes imports
import { LoginRouter } from './routes/auth/login.router';
import { RegisterRouter } from './routes/auth/register.router';
import { AllUsersRouter } from './routes/users/users_management/allUsers.router';
import { IdUserRouter } from './routes/users/users_management/idUser.router';
import { CreateByAdminRouter } from './routes/users/users_management/createByAdmin.router';
import { PatchByAdminRouter } from './routes/users/users_management/patchByAdmin.router';
import { GetProfileRouter } from './routes/users/user/getProfile.router';


export class AppRoutes{
    // Variables
    private app: express.Application;
    private db: DB;

    //Constructor
    constructor(app: express.Application, db: DB){
        this.app = app;
        this.db = db;
        this.configRoutes();
    }

    configRoutes(){
        // Auth
        this.app.use('/login', new LoginRouter(this.db).configureRoutes());
        this.app.use('/register', new RegisterRouter(this.db).configureRoutes());

        // Users
        /// Management of system (managers / admin)
        this.app.use('/user/all', new AllUsersRouter(this.db).configureRoutes());
        this.app.use('/user/id', new IdUserRouter(this.db).configureRoutes());
        this.app.use('/user/createByAdmin', new CreateByAdminRouter(this.db).configureRoutes());
        this.app.use('/user/updateByAdmin', new PatchByAdminRouter(this.db).configureRoutes());
        
        /// Customer management ( users / clients for themselves)
        this.app.use('/user/profile', new GetProfileRouter(this.db).configureRoutes());

    }
}