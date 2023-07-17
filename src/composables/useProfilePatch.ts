import { authApi } from 'src/boot/axios';
import { Ref, ref } from 'vue';

const err: Ref = ref(null);
const profile: Ref = ref(null);
const isLoading = ref(false);

const patchProfile = async (userUpdate: UserUpdate) => {
  err.value = null;
  isLoading.value = true;
  try {
    const user = localStorage.getItem('user');
    if (!user) throw new Error('User not saved')
    const { userId } = JSON.parse(user);
    for (const key in userUpdate) {
      if (!userUpdate[key as keyof UserUpdate]) {
        delete userUpdate[key as keyof UserUpdate];
      }
    }
    const res = await authApi
      .patch(`/user/${userId}`, userUpdate);
    err.value = null;
    profile.value = res.data;
    isLoading.value = false;
    return res.data;
  } catch (e) {
    err.value = 'Error data updated';
    console.log(e);
    isLoading.value = false;
  }
};

const useProfilePatch = () => {
  return { err, profile, patchProfile, isLoading };
};

export default useProfilePatch;
