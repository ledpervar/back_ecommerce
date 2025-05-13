// Import
import { DB } from '../../../dao/db.dao';

// Interface import
import { GetProfileResult,
         ResponseGetProfileService } from '../../../interfaces/user.interfaces';

// Service class
export class GetProfileService{
    // Variable
    private db: DB;

    // Constructor
    constructor(db: DB){
        this.db = db;
    }

    // Logic, service function
    getProfile = async (idUser: number) =>{
        try{
            // Call the database to obtain the user's personal data
            const personalData: GetProfileResult[] = await this.db.queryPool(
                `SELECT users.email, users.role, userdata.name, userdata.surname, 
                        userdata.address, userdata.postal_code, userdata.province, 
                        userdata.locality, userdata.identity_document_type, userdata.document_number, 
                        userdata.telephone 
                FROM users 
                LEFT JOIN userdata ON users.id = userdata.id_user_fk 
                WHERE users.id = ? AND users.deleted_at IS NULL`, // Block access to deleted or disabled accounts
                [idUser]
            );

            // Verify that the call has data to avoid errors in execution, because:
            // 1. The token does not check whether the user still exists or is still active.
            // 2. The sql query Filters non-existent or deleted users (deleted_at IS NULL).
            // 3. BUT... If we don't do the following check, you may end up accessing result[0], which will be undefined.
            if(personalData.length <= 0){
                return null;
            }
            
            // Reassign personalData to be the first result
            const infoUser: GetProfileResult = personalData[0];

            // Check the profile is incomplete
            const userdataRequiredFields =[
                infoUser.name,
                infoUser.surname,
                infoUser.address,
                infoUser.postal_code,
                infoUser.province,
                infoUser.locality,
                infoUser.identity_document_type,
                infoUser.document_number,
                infoUser.telephone
            ];
            const needsCompletion = userdataRequiredFields.some(value => value === null || value === undefined || value === '');

            const profileUser: ResponseGetProfileService = {
                email: infoUser.email,
                role: infoUser.role,
                userdata: {
                    name: infoUser.name,
                    surname: infoUser.surname,
                    address: infoUser.address,
                    postal_code: infoUser.postal_code,
                    province: infoUser.province,
                    locality: infoUser.locality,
                    identity_document_type: infoUser.identity_document_type,
                    document_number: infoUser.document_number,
                    telephone: infoUser.telephone
                },
                needsCompletion
            };

            return profileUser;

        }catch(error){
            console.error('Error en GetProfileService: ', error);
            return null;
        }
    }
}