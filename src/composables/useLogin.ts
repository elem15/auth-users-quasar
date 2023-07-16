import { api } from 'src/boot/axios';
import { Ref, ref } from 'vue';
import { setAuthStorage } from './setAuthStorage';

const err: Ref = ref(null);

const login = async (email: string, password: string) => {
  err.value = null;
  try {
    const res = await api
      .post('/auth/signin', { email, password }
      );
    setAuthStorage(res.data);
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
