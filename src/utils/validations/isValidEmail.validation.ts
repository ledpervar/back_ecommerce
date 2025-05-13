// Function for verify that if email format is correct
export function isValidEmailFormat(email: string): boolean {
    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);

    } catch (error) {
      console.error('Error in isValidEmailFormat: ', error);
      return false;
    }
}