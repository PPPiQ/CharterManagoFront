export interface UserCredentials {
  email: string;
  password?: string;
}

export interface UserAccount {
  login: string;
  name?: string | undefined;
  surname?:string | undefined;
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
  name: string,
  roles: []
}

export class AccountData implements UserAccount {
  login: string | "";
  name: string | undefined;
  surname: string | undefined;
  nick: string | undefined;
  phone: number | undefined;
  constructor(data: UserAccount) {
    this.login = data.login;
  }
}

export enum AUTH_STATE {
  UNAUTHORISED = "Not authorised!"
}


