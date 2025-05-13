// Import
import { DB } from '../../../dao/db.dao';

// Interface import
import { GetUserByIdResult } from '../../../interfaces/user.interfaces';

// Service class
export class GetUserByIdService{
    // Variable
    private db: DB;

    // Constructor
    constructor(db: DB){
        this.db = db;
    }

    // Logic, service function
    getUserById = async (idUser: number) => {
        try{
            // Call to database to obtain the info of the user by his ID.
            const infoSearchedUser : GetUserByIdResult[] = await this.db.queryPool(
                `SELECT users.id, users.role, users.email, IF(users.deleted_at IS NULL, 'activo', 'inactivo') AS state,
                        users.created_at, users.deleted_at, userdata.name, userdata.surname, userdata.identity_document_type,
                        userdata.document_number, userdata.telephone, userdata.address, userdata.postal_code, userdata.province,
                        userdata.locality
                FROM users
                LEFT JOIN userdata ON users.id = userdata.id_user_fk
                WHERE users.id = ?`,
                [idUser]
            );

            // Verify that the call has data
            if(infoSearchedUser.length <= 0){
                console.log('Usuario no encontrado o inexistente ', idUser);
                return null;
            }

            // Reassign personalData to be the first result
            const personalInfoUser : GetUserByIdResult = infoSearchedUser[0];

            return personalInfoUser;

        }catch(error){
            console.error('Error en GetUserByIdService: ', error);
            return null;
        }
    }
}