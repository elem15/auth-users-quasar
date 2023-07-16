<template>
  <div v-if="isLoading">
    <LoadingSpinner />
  </div>
  <q-page class="items-center justify-center column">
    <h3>Sign In</h3>
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

<style>
form {
  background: white;
  padding: 0 30px;
  border-radius: 10px;
  width: 20rem;
}

label {
  display: block;
  color: #bbb;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 1px;
  margin: 20px 0 10px 0;
}

label.alert {
  color: red;
  position: absolute;
}

.error {
  position: relative;
  width: 20rem;
  padding: 0 30px;
}

input {
  padding: 10px;
  border: 0;
  border-bottom: 1px solid #ddd;
  width: 100%;
  box-sizing: border-box;
}

button {
  display: block;
  margin: 20px 0 0;
  background: #033687;
  color: white;
  padding: 10px 15px;
  border: 0;
  border-radius: 2rem;
  font-size: 1rem;
  cursor: pointer;
}

button:hover {
  background: #164ea7;
}

button:active {
  background: #0b1e3d;
}

.button-wrapper {
  text-align: right;
  display: flex;
  justify-content: right;
  align-items: end;
}
</style>
