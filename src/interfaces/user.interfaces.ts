// Types imports
import { role, deletionCapableRole } from '../common/constants/roles.const';
import { deleteUserReason } from '../common/constants/deleteReasons.const';

//____________________________USER //
///////////////////////////// USER: GET PROFILE /////////////////////////////

export interface GetProfileResult {
    email: string;
    role: role;
  
    name: string | null;
    surname: string | null;
    address: string | null;
    postal_code: string | null; // String recomended
    province: string | null;
    locality: string | null;
    identity_document_type: 'DNI'| 'NIE'| null; 
    document_number: string | null;
    telephone: string | null; // String recomended
}

export interface ResponseGetProfileService {
    email: string;
    role: role;
    userdata: {
        name: string | null;
        surname: string | null;
        address: string | null;
        postal_code: string | null; // String recomended
        province: string | null;
        locality: string | null;
        identity_document_type: 'DNI'| 'NIE'| null; 
        document_number: string | null;
        telephone: string | null; // String recomended
    },
    needsCompletion: boolean; 
}

///////////////////////////// USER: COMPLETE PROFILE /////////////////////////////

export interface ParamsCompleteProfile {
    name: string;
    surname: string;
    address: string;
    postal_code: string; // String recomended
    province: string;
    locality: string;
    identity_document_type: 'DNI'| 'NIE'; 
    document_number: string;
    telephone: string; // String recomended
}

export interface CheckResults{
    id: number;
}

export interface InsertDataProfileResult {
    insertId: number;
    affectedRows: number;
    warningCount?: number;
}

///////////////////////////// USER: UPDATE PROFILE /////////////////////////////

export interface ParamsUpdateProfile{
    name?: string;
    surname?: string;
    address?: string;
    postal_code?: string; // String recomended
    province?: string;
    locality?: string;
    identity_document_type?: 'DNI'| 'NIE'; 
    document_number?: string;
    telephone?: string; // String recomended
}

export interface UpdateResult {
  affectedRows: number;
}

//____________________________MANAGER //
///////////////////////////// MANAGER: GET ALL USERS /////////////////////////////

export interface GetAllUsersResult {
    id: number;
    role: role;
    email: string;
    name: string | null;
    surname: string | null;
    locality: string | null;
    telephone: string | null;
    state: 'activo' | 'inactivo';
    created_at: Date;
    deleted_at: Date | null;
    total_orders: number;  
}

//////////////////////////// MANAGER: GET USERS BY ID ////////////////////////////

export interface GetUserByIdResult {
    id: number;
    role: role;
    email: string;
    state: 'activo' | 'inactivo';
    created_at: Date;
    deleted_at: Date | null;
    name: string | null;
    surname: string | null;
    identity_document_type: 'DNI' | 'NIE' | null;
    document_number: string | null;
    telephone: string | null;
    address: string | null;
    postal_code: string | null;
    province: string | null;
    locality: string | null;
}

////////////////////////// MANAGER: CREATE USER AS MANAGER //////////////////////////

export interface ParamsCreateUserByAdmin {
    email: string;
    provisionalPass: string;
    role: role;
}

export interface CreateUserByAdminResult {
    id: number;
}

////////////////////////// MANAGER: UPDATE USER AS MANAGER //////////////////////////

export interface ParamsUpdateUserByAdmin {
    idUserToUpdate: number;
    roleToUpdate: role;
}

export interface ExistingUser {
    id: number;
    role: string;
}

export interface ChangeRoleResult {
    id: number;
    changeRole: boolean;
}

////////////////////////// MANAGER: DELETE USER AS MANAGER //////////////////////////

export interface ParamsDeleteUserByAdmin {
    idUserToDelete: number;
    idManager: number;
    managerRole: deletionCapableRole;
    reason: deleteUserReason;
}

export interface ExistingUserResult {
    id: number;
    deleted_at: Date | null;
}

export interface SoftDeleteResult {
    affectedRows: number;
}