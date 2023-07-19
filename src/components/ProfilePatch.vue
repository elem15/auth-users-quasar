<template>
  <div v-if="isLoading">
    <LoadingSpinner />
  </div>
  <div class="error"><label class="alert">{{ err }}</label></div>
  <q-page class="items-center justify-center column">
    <section>
      <div class="button-close" @click="toggleEditMode">⨉</div>
      <h1 class="text-h5">Edit profile</h1>
      <q-form @submit.prevent="handleSubmit">
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
          <button>Submit form</button>
        </div>
      </q-form>
      <button class="button-delete" @click="open = true">Delete profile</button>
    </section>
    <Teleport to="body">
      <div v-if="open" class="modal-wrapper" @click="open = false">
        <div class="modal" @click.stop="">
          <div class="button-close" @click="open = false">⨉</div>
          <p>Are you sure you want to delete your profile?</p>
          <div class="row justify-around">
            <button class="button-delete" @click="handleDeleteProfile">Delete</button>
            <button @click="open = false">Cancel</button>
          </div>
        </div>
      </div>
    </Teleport>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onUnmounted, ref, toRefs } from 'vue';
import useProfileEdit from '../composables/useProfileEdit';
import LoadingSpinner from 'src/components/Spinner.vue';
import { useRouter } from 'vue-router';
export default defineComponent({
  name: 'ProfilePatch',
  components: { LoadingSpinner },
  props: ['profile', 'toggleEditMode'],
  setup(props) {
    const router = useRouter()
    const open = ref(false);
    const passwordVisibility = ref(false)
    const passwordCnf = ref('');
    const password = ref('');
    const { err, patchProfile, isLoading, deleteProfile } = useProfileEdit();
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
    const handleDeleteProfile = async () => {
      await deleteProfile()
      router.push('/signup')
    }
    onUnmounted(() => {
      err.value = null;
    })
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
      passwordVisibility,
      handleDeleteProfile,
      open
    }
  },
});
</script>

<style>
section {
  position: relative;
}

.button-close {
  position: absolute;
  font-size: 1.5rem;
  font-weight: bold;
  color: rgb(48, 48, 48);
  right: 0;
  top: 1rem;
  cursor: pointer;
}

.modal .button-close {
  right: -1.5rem;
  top: -1.5rem
}

.button-close:hover {
  color: rgb(108, 108, 108);
  box-shadow: rgb(97, 97, 97);
}

.button-delete {
  position: absolute;
  bottom: 0;
  left: 2rem;
  background-color: rgb(192, 0, 0);
}

.button-delete:hover {
  background-color: rgb(186, 46, 46);
}

.modal-wrapper {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  padding: 20vh 30vw;
  background-color: hsla(158, 53%, 30%, 0.858);
}

.modal {
  position: relative;
  width: 25rem;
  padding: 2rem;
  border-radius: 2rem;
  background-color: rgb(246, 246, 242);
}

.modal p {
  font-size: 1.5rem;
}

.modal .button-delete {
  position: static;
}
</style>

