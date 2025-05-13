// Import
import { VALID_ROLES, role } from "../constants/roles.const";

// Funtion to check if the role of user is valid for ecommerce
export function isValidRole(_role: string): _role is role {
    return VALID_ROLES.includes(_role as role);
}
