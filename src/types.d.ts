type AuthResponse = {
  accessToken: string;
  email: string;
  exp: number;
  refreshToken: string;
  userId: number;
}
type UserUpdate = {
  email?: string;
  name?: string;
  phone?: string;
  address?: string;
  about?: string;
}
