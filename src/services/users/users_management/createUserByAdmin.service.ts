// Imports
import { DB } from '../../../dao/db.dao';
import bcrypt from 'bcrypt';

// Interface import
import { ParamsCreateUserByAdmin, CreateUserByAdminResult } from '../../../interfaces/user.interfaces';

// Service class
export class CreateUserByAdminService{
    // Variables
    private db: DB;
    private saltRounds: number = 10;

    // Constructor
    constructor(db: DB){
        this.db = db;
    }

    // Logic, service function
    createUserByAdmin = async (parametersCreateUserByAdmin: ParamsCreateUserByAdmin) =>{
        try{
            // Data
            const { email, provisionalPass, role } = parametersCreateUserByAdmin;

            // Check if the user already exists
            const existingUser = await this.db.queryPool(
                `SELECT id FROM users WHERE email = ?`, 
                [email]
            );

            if(existingUser.length > 0){
                console.log('Ya existe un usuario registrado con este email: ', email);
                return null;
            }

            // Encrypt the pass
            const hashedProvisionalPass: string = await bcrypt.hash(provisionalPass, this.saltRounds);

            // Insert in database the new user in the user table
            const insertUserByAdmin: CreateUserByAdminResult = await this.db.queryPool(
                `INSERT INTO users (email, pass, role, created_at) VALUES (?, ?, ?, NOW())`,
                [email, hashedProvisionalPass, role]
            );

            return { id: insertUserByAdmin.id };

        }catch(error){
            console.error('Error en CreateUserByAdminService: ', error);
            return null;
        }
    }
}