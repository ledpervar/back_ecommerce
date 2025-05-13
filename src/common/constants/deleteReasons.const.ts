///////////////////// DELETE USERS REASONS: ALL THE REASONS /////////////////////

// Predefined reasons to delete a user of system
export const DELETE_USER_REASONS = [
    'Usuario desvinculado de la empresa',
    'Uso indebido del sistema',
    'Actividad sospechosa o maliciosa',
    'Solicitud del usuario',
    'Cuenta duplicada por error',
    'Otras razones'
] as const;
  
// Create a type 
export type deleteUserReason = typeof DELETE_USER_REASONS[number];