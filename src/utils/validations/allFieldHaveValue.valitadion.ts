// Check that all fields are not null, undefined, or empty (for strings)
export function allFieldsHaveValue(fields: any[]): boolean {
    try {
        for (const field of fields) {
            if (!field) {
            return false; 
            }
        }
        return true;

    } catch (error) {
        console.error('Error en allFieldsHaveValue: ', error);
        return false;
    }
}