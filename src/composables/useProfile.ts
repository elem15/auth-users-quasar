import { authApi } from 'src/boot/axios';
import { Ref, ref } from 'vue';

const err: Ref = ref(null);
const profile: Ref = ref(null);
const getProfile = async () => {
  err.value = null;
  try {
    const user = sessionStorage.getItem('user');
    if (!user) throw new Error('User not saved')
    const { userId } = JSON.parse(user);
    const res = await authApi
      .get(`/user/${userId}`);
    err.value = null;
    profile.value = res.data;
  } catch (e) {
    err.value = 'Incorrect login credentials';
    console.log(e);
  }
};

const useProfile = () => {
  return { err, profile, getProfile };
};

export default useProfile;