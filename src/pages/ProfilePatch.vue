<template>
  <div v-if="isLoading">
    <LoadingSpinner />
  </div>
  <q-page class="items-center justify-center column">
    <h3>Edit profile</h3>
    <q-form @submit.prevent="handleSubmit">
      <div>
        <label for="">Email</label>
        <input type="email" v-model="email" />
      </div>
      <div>
        <label for="">Password</label>
        <input type="password" minlength="5" v-model="password" />
      </div>
      <div>
        <label for="">Phone</label>
        <input type="tel" minlength="8" v-model="phone" />
      </div>
      <div>
        <label for="">Address</label>
        <input type="text" minlength="5" v-model="address" />
      </div>
      <div>
        <label for="">About</label>
        <textarea minlength="5" v-model="about" />
      </div>
      <div class="button-wrapper">
        <button>Submit</button>
      </div>
    </q-form>
    <div class="error"><label class="alert">{{ err }}</label></div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import useProfilePatch from '../composables/useProfilePatch';
import LoadingSpinner from 'src/components/Spinner.vue';
import { useRouter } from 'vue-router';
export default defineComponent({
  name: 'SignInPage',
  components: { LoadingSpinner },
  setup() {
    const router = useRouter();
    const { err, patchProfile, isLoading } = useProfilePatch();
    const email = ref('');
    const password = ref('');
    const phone = ref('');
    const about = ref('');
    const address = ref('')
    const handleSubmit = async () => {
      const userUpdate = {
        email: email.value,
        password: password.value,
        phone: phone.value,
        about: about.value,
        address: address.value,
      }
      await patchProfile(userUpdate);
      if (!err.value) {
        router.push('/');
      }
    }
    return {
      email,
      password,
      handleSubmit,
      err,
      isLoading,
      phone,
      about,
      address
    }
  },
});
</script>

<style src="./pages.styles.css"></style>

