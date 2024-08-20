export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface CheckResponse {
  name: string;
  email: string;
}

export interface User {
  displayName: string;
  email: string;
}
