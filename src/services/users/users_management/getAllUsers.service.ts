// Import
import { DB } from '../../../dao/db.dao';

// Interface import
import { GetAllUsersResult } from '../../../interfaces/user.interfaces';

// Service class
export class GetAllUsersService{
    // Variable
    private db: DB;

    // Constructor
    constructor(db: DB){
        this.db = db;
    }

    // Logic, service function
    getAllUsers = async (limit: number, offset: number) =>{
        try{
            // Call the database to obtain the info of the users's list
            const infoUsersList: GetAllUsersResult[] = await this.db.queryPool(
                `SELECT users.id, users.role, users.email, userdata.name, 
                        userdata.surname, userdata.locality, userdata.telephone,
                        IF(users.deleted_at IS NULL, 'activo', 'inactivo') AS state,
                        users.created_at, users.deleted_at,
                        (SELECT COUNT(*) 
                        FROM orders 
                        WHERE orders.id_user_fk = users.id
                        ) AS total_orders
                FROM users
                LEFT JOIN userdata ON users.id = userdata.id_user_fk
                ORDER BY users.created_at DESC
                LIMIT ? OFFSET ?`,
                [limit, offset]
            );

            return infoUsersList.length > 0 ? infoUsersList : [];
            
        }catch(error){
            console.error('Error en GetAllUsersService: ', error);
            return null;
        }
    }
}
