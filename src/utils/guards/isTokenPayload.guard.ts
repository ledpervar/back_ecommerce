// Imports
import { JwtPayload } from 'jsonwebtoken';
import { TokenPayload } from '../../interfaces/auth.interfaces';

// Validation imports 
import { areNumberFields } from '../validations/areNumberFields.validation';
import { areStringFields } from '../../utils/validations/areStringFields.validation';

// Function to check if the decoded token is a valid TokenPayload
export function isTokenPayload(decoded: string | JwtPayload): decoded is TokenPayload{
    // Validations
    // 1. Verify that decoded is a objet, no string
    if(typeof decoded === 'string') return false;

    // 2. Verify that exits all variables
    const requiredKeys = ['id', 'role', 'iat', 'exp'];
    for (const key of requiredKeys) {
      if (!(key in decoded)) return false;
    }

    // 3. Verity the types
    const numberFields = [decoded.id, decoded.iat, decoded.exp];
    const stringFields = [decoded.role];

    if (!areNumberFields(numberFields)) return false;
    if (!areStringFields(stringFields)) return false;

    return true;
}