export interface User {
  email_user: string;
  password_user: string;
  firstname_user?: string;
  lastname_user?: string;
  birthdate_user?: string;
  phone_user?: string;
}

export interface UserInformation {
  email: string;
  password: string;
  firstname?: string;
  lastname?: string;
  birthdate?: string;
  phone?: string;
  picture?: string;
  cgu?: string;
  newsletter?: string
}
