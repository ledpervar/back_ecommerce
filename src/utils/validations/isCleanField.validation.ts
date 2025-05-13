// Clear fields of empty spaces at the beginning and end, only if the field type is string
export function isCleanField(field: string): boolean {
    return field === field.trim(); // The .trim() method expects a string as an argument
}