export const setAuthStorage = (data: AuthResponse) => {
  const { refreshToken, ...user } = data;
  sessionStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('refreshToken', refreshToken);
}
