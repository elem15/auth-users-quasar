export const setAuthStorage = (data?: AuthResponse) => {
  if (!data) {
    sessionStorage.clear();
    localStorage.removeItem('user');
    return;
  }
  const { accessToken, exp, ...user } = data;
  sessionStorage.setItem('accessToken', accessToken);
  sessionStorage.setItem('exp', exp + '');
  localStorage.setItem('user', JSON.stringify(user));
}
