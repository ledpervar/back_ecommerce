// Confirm that the format type of the fields are string
export function areStringFields(fields: any[]): boolean {
    try {
        // Check that the input is actually an array
        if (!Array.isArray(fields)) {
            return false;
        }

        for (let i = 0; i < fields.length; i++) {
            const field = fields[i];
            if (typeof field !== 'string') {
                return false;
            }
        }
        return true;

    } catch (error) {
        console.error('Error en areStringFields: ', error)
        return false;
    }
}