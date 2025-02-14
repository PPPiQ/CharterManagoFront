export interface UserCredentials {
  email: string;
  password?: string;
}

export interface AuthSessionData {
  id?: number | null,
  accessToken: string | null;
}

