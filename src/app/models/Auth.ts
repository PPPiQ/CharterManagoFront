export interface UserCredentials {
  email: string;
  password?: string;
}

export interface UserAccount {
  email: string;
  firstName?: string | undefined;
  lastName?:string | undefined;
  nick?:string | undefined;
  phone?:number | undefined;
}

export interface AuthSessionData {
  id?: number | null;
  accessToken: string | null;
}

export interface UserDataResponse {
  success: boolean,
  user: UserDataDetails
}

export interface UserDataDetails {
  _id: string,
  created_at: string, 
  email: string, 
  firstName: string,
  lastName: string, 
  roles: []
}

export class AccountData implements UserAccount {
  email: string | "";
  firstName: string | undefined;
  lastName: string | undefined;
  phone: number | undefined;
  constructor(data: UserAccount) {
    this.email = data.email;
  }
}

export enum AUTH_STATE {
  UNAUTHORISED = "Not authorised!"
}


