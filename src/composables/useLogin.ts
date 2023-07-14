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
    const { accessToken, exp, ...user } = res.data as AuthResponse;
    sessionStorage.setItem('accessToken', accessToken);
    sessionStorage.setItem('exp', exp + '');
    localStorage.setItem('user', JSON.stringify(user));
    err.value = null;
    return res;
  } catch (e) {
    err.value = 'Incorrect login credentials';
    console.log(e);
  }
};

const useLogin = () => {
  return { err, login };
};

export default useLogin;
