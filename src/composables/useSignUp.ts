import { api } from 'src/boot/axios';
import { Ref, ref } from 'vue';
import { setAuthStorage } from './setAuthStorage';

const err: Ref = ref(null);
const isLoading = ref(false);

const signUp = async (email: string, password: string) => {
  err.value = null;
  isLoading.value = true;
  try {
    const res = await api
      .post('/auth/signup', { email, password }
      );
    setAuthStorage(res.data);
    err.value = null;
    isLoading.value = false;
    return res;
  } catch (e) {
    err.value = 'User already exist';
    console.log(e);
    isLoading.value = false;
  }
};

const useSignUp = () => {
  return { err, signUp, isLoading };
};

export default useSignUp;
