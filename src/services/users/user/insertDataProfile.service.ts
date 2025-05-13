// Import
import { DB } from '../../../dao/db.dao';

// Interface import
import { ParamsCompleteProfile, InsertDataProfileResult, 
         CheckResults} from '../../../interfaces/user.interfaces';

// Service class
export class InsertDataProfileService{
    // Variable
    private db: DB;

    // Constructor
    constructor(db: DB){
        this.db = db;
    }

    // Logic, service function
    insertDataProfile = async (idUser: number, parametersCompleteProfile: ParamsCompleteProfile) =>{
        try{
            // Data. Extract data from body
            const { name, surname, address,
                postal_code, province, locality,
                identity_document_type, document_number, telephone
            } = parametersCompleteProfile;

            // Check if the user exists and is active
            const userCheck: CheckResults[] = await this.db.queryPool(
                `SELECT id FROM users WHERE id = ? AND state = 1`,
                [idUser]
            );

            if (userCheck.length ===  0){
                console.log('Usuario no encontrado / inactivo');
                return null;
            }

            // Check if profile's user exists
            const profileExists: CheckResults[] = await this.db.queryPool(
                `SELECT id FROM userdata WHERE id_user_fk = ?`,
                [idUser]
            );

            if (profileExists.length > 0) {
                console.log('El usuario ya tiene un perfil completado');
                return null;
            }

            // Insert profile data in table userdata
            const insertDataProfile: InsertDataProfileResult = await this.db.queryPool(
                `INSERT INTO userdata (id_user_fk, name, surname, address, postal_code,
                    province, locality, identity_document_type, document_number, telephone) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [idUser, name, surname, address, postal_code, province, locality,
                identity_document_type, document_number, telephone]
            );
            
            return true; 

        }catch(error){
            console.error('Error en InsertDataProfileService: ', error);
            return null;
        }
    }
}
