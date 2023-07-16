import { api } from 'src/boot/axios';
import { Ref, ref } from 'vue';
import { setAuthStorage } from './setAuthStorage';

const err: Ref = ref(null);
const isLoading = ref(false);

const login = async (email: string, password: string) => {
  err.value = null;
  isLoading.value = true;
  try {
    const res = await api
      .post('/auth/signin', { email, password }
      );
    setAuthStorage(res.data);
    err.value = null;
    isLoading.value = false;
    return res;
  } catch (e) {
    err.value = 'Incorrect login credentials';
    console.log(e);
    isLoading.value = false;
  }
};

const useLogin = () => {
  return { err, login, isLoading };
};

export default useLogin;
