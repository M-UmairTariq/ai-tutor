export type UserRole = 'student' | 'teacher' | 'admin';

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
  }
  
  export interface LoginCredentials {
    username: string;
    password: string;
  }
  
  export interface AuthResponse {
    user: User;
    token: string;
  }