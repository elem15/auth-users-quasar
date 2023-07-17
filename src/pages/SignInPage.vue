<template>
  <div v-if="isLoading">
    <LoadingSpinner />
  </div>
  <q-page class="items-center justify-center column">
    <h1 class="text-h5">Sign In</h1>
    <q-form @submit.prevent="handleSubmit">
      <div>
        <label for="">Email</label>
        <input type="email" v-model="email" required />
      </div>
      <div>
        <label for="">Password</label>
        <input type="password" minlength="5" v-model="password" required />
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
import useLogin from '../composables/useLogin';
import LoadingSpinner from 'src/components/Spinner.vue';
import { useRouter } from 'vue-router';
export default defineComponent({
  name: 'SignInPage',
  components: { LoadingSpinner },
  setup() {
    const router = useRouter();
    const { err, login, isLoading } = useLogin();
    const email = ref('');
    const password = ref('');
    const handleSubmit = async () => {
      await login(email.value, password.value);
      if (!err.value) {
        router.push('/');
      }
    }
    return {
      email,
      password,
      handleSubmit,
      err,
      isLoading
    }
  },
});
</script>

<style src="./pages.styles.css"></style>
