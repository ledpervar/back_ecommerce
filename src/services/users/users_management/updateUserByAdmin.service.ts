// Import
import { DB } from '../../../dao/db.dao';

// Interface import
import { ChangeRoleResult, ParamsUpdateUserByAdmin, ExistingUser } from '../../../interfaces/user.interfaces';

// Service class
export class UpdateUserByAdminService{
    // Variable
    private db: DB;

    // Constructor
    constructor(db: DB){
        this.db = db;
    }

    // Logic, service function
    updateUserByAdmin = async (parametersUpdateUserByAdmin: ParamsUpdateUserByAdmin) =>{
        try{
            // Data
            const { idUserToUpdate, roleToUpdate } = parametersUpdateUserByAdmin;

            // Check if the user exists and is active
            const existingUser: ExistingUser[] = await this.db.queryPool(
                `SELECT id, role FROM users WHERE id = ? AND deleted_at IS NULL`, 
                [idUserToUpdate]
            );

            if(existingUser.length === 0){
                console.log('Usuario no encontrado o eliminado / inactivo ', idUserToUpdate);
                return null;
            }

            // Collect the role data that already exists in the database
            const currentRole: string = existingUser[0].role;

            // Check if the role is the same. It's that true, not update
            if(currentRole === roleToUpdate){
                console.log('El rol del usuario es el mismo no requiere actualización')
                return null;
            }

            // Update role
            const changeRole = await this.db.queryPool(
                `UPDATE users SET role = ? WHERE id = ?`,
                [ roleToUpdate, idUserToUpdate ]
            );

            // Check if the role has been updated
            if(changeRole.affectedRows === 0){
                console.error('Error: no se ha podido actualizar el rol de usuario')
                return null;
            }

            const changeRoleResult: ChangeRoleResult ={
                id: idUserToUpdate,
                changeRole: true
            };

            return changeRoleResult;

        }catch(error){
            console.error('Error en UpdateUserByAdminService: ', error);
            return null;
        }
    }
}