// Function that checks if a field is a positive integer
export function isValidPositiveInteger(data: any): boolean {
    try{
        // Exclude the next values: null, undefined, objects, arrays and dates
        if(data === null || data === undefined || typeof data === 'object' ||
            Array.isArray(data) || data instanceof Date){
            return false;
        }

        // Convert data to a number
        const convertData = Number(data);

        // Validations
        const isNumber = !isNaN(convertData);
        const isInteger = Number.isInteger(convertData);
        const isPositive = convertData > 0;

        return isNumber && isInteger && isPositive;
        
    }catch(error){
        console.error('Error en isValidPositiveInteger: ', error);
        return false;
    }
}