<template>
  <div v-if="isLoading">
    <LoadingSpinner />
  </div>
  <q-page class="column items-start justify-start" v-if="profile">
    <h5>User profile</h5>
    <p>email: {{ profile.email }}</p>
    <p v-if="profile.name">name: {{ profile.name }}</p>
    <p v-if="profile.phone">phone: {{ profile.phone }}</p>
    <p v-if="profile.address">address: {{ profile.address }}</p>
    <p v-if="profile.about">about: {{ profile.about }}</p>
    <button @click="goToProfilePatch">Edit profile</button>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import useProfile from '../composables/useProfile';
import LoadingSpinner from 'src/components/Spinner.vue'
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'IndexPage',
  components: { LoadingSpinner },
  setup() {
    const router = useRouter()
    const { getProfile, err, profile, isLoading } = useProfile();
    onMounted(async () => {
      await getProfile()
      if (err.value) router.push('/signin')
    })
    const goToProfilePatch = () => {
      router.push('/profile')
    }
    return { profile, err, isLoading, goToProfilePatch };
  }
});
</script>

<style src="./pages.styles.css"></style>
