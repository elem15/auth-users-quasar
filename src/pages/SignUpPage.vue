<template>
  <div v-if="isLoading">
    <LoadingSpinner />
  </div>
  <q-page class="items-center justify-center column">
    <section>
      <h1 class="text-h5">Sign Up</h1>
      <q-form @submit.prevent="handleSubmit">
        <div>
          <label for="">Email</label>
          <input type="email" v-model="email" required />
        </div>
        <div>
          <label>Password</label>
          <input :type="passwordVisibility ? 'text' : 'password'" minlength="5" v-model="password" required />
        </div>
        <div>
          <label>Confirm Password</label>
          <input :type="passwordVisibility ? 'text' : 'password'" minlength="5" :pattern="password" v-model="passwordCnf"
            required title="Password mismatch | Пароли не совпадают" />
          <div>
            <input type="checkbox" @click="passwordVisibility = !passwordVisibility"><label class="checkbox-label">Show
              Password</label>
          </div>
        </div>
        <div class="button-wrapper">
          <button>Submit</button>
        </div>
      </q-form>
    </section>
    <div class="error"><label class="alert">{{ err }}</label></div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import useSignUp from '../composables/useSignUp';
import LoadingSpinner from 'src/components/Spinner.vue';
import { useRouter } from 'vue-router';
export default defineComponent({
  name: 'SignUpPage',
  components: { LoadingSpinner },
  setup() {
    const router = useRouter();
    const { err, signUp, isLoading } = useSignUp();
    const email = ref('');
    const password = ref('');
    const passwordVisibility = ref(false)
    const passwordCnf = ref('');
    const handleSubmit = async () => {
      await signUp(email.value, password.value);
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
      passwordVisibility,
      passwordCnf
    }
  },
});
</script>

