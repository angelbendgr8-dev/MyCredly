import { User } from './user.interface';

export interface UserResponse {
  data: {
    user: User;
    token: string;
  };
  message: string;
  status: string;
}

export interface RegisterResponse {
  status: string;
  data: {
    phone_verified: boolean;
    email_verified: boolean;
    verified: boolean;
    otp_code: string;
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  message: string;
}

export interface LoginData {
  token: string;
  findUser: {
    phone_verified: boolean;
    email_verified: boolean;
    verified: boolean;
    otp_code: string;
    _id: string;
    email: string;
    first_name: string;
    last_name: string;
    password: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    mobile_number: string;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}
export interface RegisterRequest {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}
export interface ForgotPasswordRequest {
  email?: string;
  mobile_number?: string;
  type: 'email' | 'mobile';
}
