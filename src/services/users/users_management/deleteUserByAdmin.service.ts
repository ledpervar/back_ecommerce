// Import
import { DB } from '../../../dao/db.dao';

// Interface import
import { ParamsDeleteUserByAdmin, ExistingUserResult, 
         SoftDeleteResult } from '../../../interfaces/user.interfaces';

// Service class
export class DeleteUserByAdminService{
    // Variables
    private db: DB;

    // Constructor
    constructor(db: DB){
        this.db = db;
    }

    // Logic, service function
    deleteUserByAdmin = async (parametersDeleteUserByAdmin: ParamsDeleteUserByAdmin) =>{
        try{
            // Data
            const { idUserToDelete, idManager, managerRole, reason } = parametersDeleteUserByAdmin;

            // Verify that the user exists and is not deleted
            const existingUser: ExistingUserResult[] = await this.db.queryPool(
                `SELECT id, deleted_at FROM users WHERE id = ?`, 
                [idUserToDelete]
            );

            if(existingUser.length === 0 || existingUser[0].deleted_at){
                console.log('El usuario que desea eliminar no existe o ya ha sido eliminado: ', idUserToDelete);
                return null;
            }

            // Avoid autodelete
            if(idUserToDelete === idManager){
                console.log('El usuario de gestión no puede eliminarse a sí mismo');
                return null;
            }

            // Soft delete in table users
            const deleteUser: SoftDeleteResult = await this.db.queryPool(
                `UPDATE users SET deleted_at = NOW() WHERE id = ?`,
                [idUserToDelete]
            );

            // Soft delete in table Userdata if have data of this user
            const deleteUserdata: SoftDeleteResult = await this.db.queryPool(
                `UPDATE userdata SET deleted_at = NOW() WHERE id_user_fk = ?`,
                [idUserToDelete]
            );

            console.log(`El usuario ${idUserToDelete} fue eliminado por el ${managerRole} ${idManager}. Motivo: ${reason}`);
            return true;

        }catch(error){
            console.error('Error en DeleteUserByAdminService: ', error);
            return null;
        }
    }
}