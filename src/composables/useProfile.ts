import { AxiosError } from 'axios';
import { authApi } from 'src/boot/axios';
import { Ref, ref } from 'vue';

const err: Ref = ref(null);
const profile: Ref = ref(null);
const isLoading = ref(false);

const getProfile = async () => {
  err.value = null;
  isLoading.value = true;
  try {
    const user = localStorage.getItem('user');
    if (!user) throw new Error('User not saved')
    const { userId } = JSON.parse(user);
    const res = await authApi
      .get(`/user/${userId}`);
    err.value = null;
    profile.value = res.data;
    isLoading.value = false;
  } catch (e) {
    if (e instanceof AxiosError && e?.response) {
      err.value = e.response.data.message;
      console.log(e.response.data);
    } else {
      err.value = 'Incorrect login credentials';
      console.log(e);
    }
    isLoading.value = false;
  }
};

const useProfile = () => {
  return { err, profile, getProfile, isLoading };
};

export default useProfile;
