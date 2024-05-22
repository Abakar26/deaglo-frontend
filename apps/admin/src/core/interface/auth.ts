export interface SignInRequest {
  email: string;
  password: string;
}

export interface ForgotPassword {
  email: string;
  code?: string;
  new_password?: string;
}
