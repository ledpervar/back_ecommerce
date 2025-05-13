// Function for verify that if pass format is secure (with regular expressions)
export function isValidPassFormat(pass: string): boolean {
    try {
        // Check length
        if (pass.length < 8) return false;

        // Validations and check characters
        const hasUppercaseRegex = /[A-Z]/.test(pass);
        const hasLowercaseRegex = /[a-z]/.test(pass);
        const hasNumberRegex = /\d/.test(pass);
        const hasSpecialCharRegex = /[!@#$%^&*()_+\[\]{}|;:,.<>?\\-]/.test(pass);

        return hasUppercaseRegex && hasLowercaseRegex && hasNumberRegex && hasSpecialCharRegex;

    } catch (error) {
        console.error('Error en isValidPassFormat: ', error);
        return false;
    }
}
