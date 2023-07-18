<template>
  <div v-if="isLoading">
    <LoadingSpinner />
  </div>
  <div class="error"><label class="alert">{{ err }}</label></div>
  <q-page class="items-center justify-center column">
    <q-form @submit.prevent="handleSubmit">
      <h1 class="text-h5">Edit profile</h1>
      <div>
        <label>Name</label>
        <input type="name" v-model="name" />
      </div>
      <div>
        <label>Password</label>
        <input :type="passwordVisibility ? 'text' : 'password'" minlength="5" v-model="password" />
      </div>
      <div>
        <label>Confirm Password</label>
        <input :type="passwordVisibility ? 'text' : 'password'" minlength="5" :pattern="password" v-model="passwordCnf"
          title="Password mismatch | Пароли не совпадают" :required="password ? true : false" />
        <div>
          <input type="checkbox" @click="passwordVisibility = !passwordVisibility"><label class="checkbox-label">Show
            Password</label>
        </div>
      </div>
      <div>
        <label>Phone</label>
        <input type="tel" minlength="8" v-model="phone" />
      </div>
      <div>
        <label>Address</label>
        <input type="text" minlength="8" v-model="address" />
      </div>
      <div>
        <label>About</label>
        <textarea minlength="8" v-model="about" />
      </div>
      <div class="button-wrapper">
        <button>Submit</button>
      </div>
    </q-form>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs } from 'vue';
import useProfilePatch from '../composables/useProfilePatch';
import LoadingSpinner from 'src/components/Spinner.vue';
export default defineComponent({
  name: 'ProfilePatch',
  components: { LoadingSpinner },
  props: ['profile', 'toggleEditMode'],
  setup(props) {
    const passwordVisibility = ref(false)
    const passwordCnf = ref('');
    const password = ref('');
    const { err, patchProfile, isLoading } = useProfilePatch();
    const { name, phone, address, about, email } = toRefs(props.profile);
    const handleSubmit = async () => {
      const userUpdate = {
        name: name.value,
        email: email.value,
        password: password.value,
        phone: phone.value,
        about: about.value,
        address: address.value,
      }
      await patchProfile(userUpdate);
      if (!err.value) {
        props.toggleEditMode();
      }
    }
    return {
      email,
      password,
      name,
      handleSubmit,
      err,
      isLoading,
      phone,
      about,
      address,
      passwordCnf,
      passwordVisibility
    }
  },
});
</script>

