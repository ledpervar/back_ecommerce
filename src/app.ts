// Import token
import dotenv from 'dotenv';
dotenv.config();

// Imports
import express, {Application} from 'express';
import * as http from 'http';
import cors from 'cors';
import { AppRoutes } from './app.route';
import { DB } from './dao/db.dao';

export class App{
    // Variables
    private app: Application;
    private port: number;
    private db: DB;

    // Constructor
    constructor(){
        this.app = express();
        this.port = Number(process.env.PORT) || 3000;
        this.settings(this.port);
        this.db = new DB();
        this.middlewares();
        this.routes();
    }

    settings(port: number){
        this.app.set('port', port);
    }

    middlewares(){
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
    }

    routes(){
        new AppRoutes(this.app, this.db);
    }

    listen = async() =>{
        const server: http.Server = http.createServer(this.app);
        await server.listen(this.app.get('port'));
        console.log('Server on port', this.app.get('port'));
    }
}