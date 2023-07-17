import { authApi } from 'src/boot/axios';
import { Ref, ref } from 'vue';
import { setAuthStorage } from './setAuthStorage';

const err: Ref = ref(null);
const isLoading: Ref = ref(false);

const logOut = async () => {
  err.value = null;
  isLoading.value = true;
  try {
    await authApi.get('/auth/logout');
    setAuthStorage();
    err.value = null;
    isLoading.value = false;
  } catch (e) {
    err.value = 'User already exist';
    console.log(e);
    isLoading.value = false;
  }

};

const useLogOut = () => {
  return { err, logOut, isLoading };
};

export default useLogOut;
