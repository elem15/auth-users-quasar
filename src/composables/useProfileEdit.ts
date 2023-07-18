import { authApi } from 'src/boot/axios';
import { Ref, ref } from 'vue';
import { setAuthStorage } from './setAuthStorage';

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
    if (!userUpdate.password) {
      delete userUpdate.password;
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


const deleteProfile = async () => {
  err.value = null;
  isLoading.value = true;
  try {
    const user = localStorage.getItem('user');
    if (!user) throw new Error('User not saved')
    const { userId } = JSON.parse(user);
    await authApi.delete(`/user/${userId}`);
    setAuthStorage();
    err.value = null;
    isLoading.value = false;
  } catch (e) {
    err.value = 'User already exist';
    console.log(e);
    isLoading.value = false;
  }
};

const useProfileEdit = () => {
  return { err, profile, patchProfile, deleteProfile, isLoading };
};

export default useProfileEdit;
