// Import
import { DB } from '../../../dao/db.dao';

// Interface import
import { ParamsUpdateProfile, CheckResults,
         UpdateResult } from '../../../interfaces/user.interfaces';

// Service class
export class UpdateDataProfileService{
    // Variable
    private db: DB;

    // Constructor
    constructor(db: DB){
        this.db = db;
    }

    // Logic, service function
    updateDataProfile = async (idUser: number, parametersDataProfile: ParamsUpdateProfile) => {
        try{
            // Check if the user exists and is active
            const userCheck: CheckResults[] = await this.db.queryPool(
                `SELECT id FROM users WHERE id = ? AND state = 1`,
                [idUser]
            );

            if (userCheck.length === 0) {
                console.log('Usuario no encontrado / inactivo');
                return null;
            }
            
            // Check that a previously profile's user exits          
            const dataProfileCheck: CheckResults[] = await this.db.queryPool(
                `SELECT id FROM userdata WHERE id_user_fk = ?`,
                [idUser]
            );

            if (dataProfileCheck.length === 0) {
                console.log('No se encontró perfil para actualizar');
                return null;
            }
            
            // Only update the fields are change (undefined = no change). Convert the object to pair array (key-value)
            const fields: string[] = Object.entries(parametersDataProfile)
                .filter(([_, value]) => value !== undefined) // Removes all pairs whose value is undefined. That is, only fields that the user has changed remain
                .map(([key, _]) => `${key} = ?`); // Makes each key a part of the SQL SET, with ? as the placeholder for the values

            // Create the array of values in the same order that the '?' genereted up.
            const values: (string | number)[] = Object.values(parametersDataProfile).filter(val => val !== undefined);

            // If the user doesn't change nothing, don't update
            if (fields.length === 0) {
                console.log('No se han encontrado datos para actualizar');
                return null;
            }

            // Create dinamic update
            const query = `UPDATE userdata SET ${fields.join(', ')} WHERE id_user_fk = ?`;
            values.push(idUser);

            const updateResult: UpdateResult = await this.db.queryPool(query, values);

            if (updateResult.affectedRows === 0) {
                console.log('No se pudo actualizar el perfil de usuario');
                return null;
            }

            return true;
        } catch(error) {
            console.error('Error en UpdateDataProfileService: ', error);
            return null;
        }
    }
}

