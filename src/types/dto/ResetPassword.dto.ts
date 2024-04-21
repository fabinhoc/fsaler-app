export interface ResetPasswordDto {
  token: string | null;
  email: string | null;
  password: string | null;
  password_confirmation: string | null;
}
