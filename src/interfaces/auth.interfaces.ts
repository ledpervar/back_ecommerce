///////////////////////////// LOGIN /////////////////////////////

// Data from client form
export interface ParamsLogin{
    email_login: string;
    pass_login: string;
    idHistorical?: number;
}

// Result of database for Login
export interface ResultCallDB{
    id: number;
    email: string;
    pass: string;
    role: string;
}

// Data of user contains in token
export interface DataUser_token{
    id: number;
    role: string;
}

// Response service
export interface ResponseServiceLogin{
    token: string | null;
    role: string;
}

/////////////////////////// REGISTER ///////////////////////////

// Data from register client form
export interface  ParamsRegister{
    email_register: string;
    pass_register: string;
    confirmPass_register?: string;
    idHistorical?: number;
}

// Result data from check user
export interface UserCheck{
    id: number;
}

// Response service
export interface ResponseServiceRegister{
    id_newUser: number;
}

/////////////////////////// AUTH TOKEN ///////////////////////////

// Token JWT content
export interface TokenPayload {
    id: number;
    role: string;
    iat: number; // (issued at) JWT
    exp: number; // (expires) JWT
}

