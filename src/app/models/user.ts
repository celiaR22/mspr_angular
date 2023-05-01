export interface User {
    email: string;
    password: string;
    firstname?: string;
    lastname?: string;
    birthdate?: string;
    phone?: string;

}

export interface UserInformation {
    email: string;
    firstname: string;
    lastname: string;
    birthdate: string;
    phone: string;
    picture?: string
}