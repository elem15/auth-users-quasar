export const setAuthStorage = (data: AuthResponse) => {
  const { accessToken, exp, ...user } = data;
  sessionStorage.setItem('accessToken', accessToken);
  sessionStorage.setItem('exp', exp + '');
  localStorage.setItem('user', JSON.stringify(user));
}
