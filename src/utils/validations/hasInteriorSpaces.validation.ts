// Verify that fields aren't interior spaces
export function hasInteriorSpaces(field: string): boolean { 
    try {
        const interiorSpaceRegex = /\S\s+\S/;
        return interiorSpaceRegex.test(field); // The .test() method expects a string as an argument

    } catch (error) {
        console.error('Error en hasInteriorSpaces: ', error);
        return false;
    }
}