type AuthResponse = {
  accessToken: string;
  email: string;
  exp: number;
  refreshToken: string;
  userId: number;
}
type UserUpdate = {
  password?: string;
  name?: string;
  phone?: string;
  address?: string;
  about?: string;
}
