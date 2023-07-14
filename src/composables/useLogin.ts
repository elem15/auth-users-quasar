import axios, { AxiosError } from 'axios';
import { Ref, ref } from 'vue';

const err: Ref = ref(null);

const login = async (email: string, password: string) => {
  console.log(email, password)
  err.value = null;
  try {
    const res = await axios
      .post('http://localhost:3000/auth/signin', { email, password }
      );
    if (!res) {
      throw new Error('Incorrect login credentials');
    }
    const { accessToken, exp, ...user } = res.data as AuthResponse;
    sessionStorage.setItem('accessToken', accessToken);
    sessionStorage.setItem('exp', exp + '');
    localStorage.setItem('user', JSON.stringify(user));
    err.value = null;
    return res;
  } catch (e) {
    const error = e as AxiosError;
    err.value = error.message;
    console.log(e);
  }
};

const useLogin = () => {
  return { err, login };
};

export default useLogin;
