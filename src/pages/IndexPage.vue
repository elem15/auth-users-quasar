<template>
  <div v-if="isLoading">
    <LoadingSpinner />
  </div>
  <ProfileView v-if="profile" :profile="profile" :goToProfilePatch="goToProfilePatch" />
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, onUnmounted } from 'vue';
import useProfile from '../composables/useProfile';
import LoadingSpinner from 'src/components/Spinner.vue'
import ProfileView from 'src/components/ProfileView.vue'
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'IndexPage',
  components: { LoadingSpinner, ProfileView },
  setup() {
    const router = useRouter()
    const { getProfile, err, profile, isLoading } = useProfile();
    onBeforeMount(async () => {
      await getProfile()
      if (err.value) router.push('/signin')
    })
    onUnmounted(() => {
      profile.value = null;
    })

    const goToProfilePatch = () => {
      router.push('/profile')
    }
    return { profile, err, isLoading, goToProfilePatch };
  }
});
</script>

<style src="./pages.styles.css"></style>
