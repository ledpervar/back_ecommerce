// Imports
import mysql, {Pool, PoolConnection} from 'mysql2/promise';

import dotenv from 'dotenv';
dotenv.config();

// Class
export class DB {
    // Param
    private conn: Pool;

    // Constructor
    constructor(){
        // Connections group: Create a reusable connections poll, which is more 
        // efficient than opening a new connection every time you make a query
        this.conn = mysql.createPool({                                       
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            port: Number(process.env.DB_PORT),
            connectionLimit: Number(process.env.DB_CONNECTION)
        });
    }

    // It is a reusable method to launch queries against connections pool.
    public async queryPool(query: string, params?: any[]){
        // Connection to database
        let connection: PoolConnection = await this.conn.getConnection();

        try{
            const [results]: any = await connection.execute(query, params);
            return results;

        }catch (error){
            console.error('Database query error', error);
            throw error;

        }finally{
            connection.release();
        }
    }
}