<template>
  <div v-if="isLoading">
    <LoadingSpinner />
  </div>
  <q-page class="column items-start justify-start" v-if="profile">
    <h5>Email: {{ profile.email }}</h5>
    <p v-if="profile.name">Name: {{ profile.name }}</p>
    <p v-if="profile.phone">Phone: {{ profile.phone }}</p>
    <p v-if="profile.address">Address: {{ profile.address }}</p>
    <p v-if="profile.about">About: {{ profile.about }}</p>
  </q-page>
  <div class="error"><label class="alert">{{ err }}</label></div>
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
    return { profile, err, isLoading };
  }
});
</script>
