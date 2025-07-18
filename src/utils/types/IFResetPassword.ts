export type IFResetPassword = {
  token?: string;
  email: string;
  password: string;
  passwordConfirm: string;
}