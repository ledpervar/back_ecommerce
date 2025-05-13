////////////////////////// ROLES: ALL THE ROLES //////////////////////////

// All the roles in the system.
export const VALID_ROLES = [
    'admin',
    'subadmin',
    'store_manager',
    'product_manager',
    'order_manager',
    'community_manager',
    'user'
] as const;

// Create a type 
export type role = typeof VALID_ROLES[number];


////////////////////// ROLES: ROLES CAN DELETE USERS //////////////////////

// Roles with permission to delete users
export const ROLES_ALLOWED_TO_DELETE_USERS = [
    'admin',
    'subadmin',
    'store_manager'
] as const;

// Create a type
export type deletionCapableRole = typeof ROLES_ALLOWED_TO_DELETE_USERS[number];