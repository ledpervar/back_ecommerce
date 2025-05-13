// Confirm that the format type of the fields are number
export function areNumberFields(fields: any[]): boolean {
    if (!Array.isArray(fields)) return false;
  
    for (let i = 0; i < fields.length; i++) {
      if (typeof fields[i] !== 'number') return false;
    }
  
    return true;
}