// types/index.ts
export interface UserCreate {
    username: string;
    email: string;
    password: string;
  }
  
  export interface UserResponse {
    id: number;
    username: string;
    email: string;
  }
  
  export interface UserLogin {
    email: string;
    password: string;
  }
  
  export interface Token {
    access_token: string;
    token_type: string;
  }
  
  export interface User {
    id: number;
    username: string;
    email: string;
  }
  