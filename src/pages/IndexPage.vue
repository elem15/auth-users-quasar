<template>
  <div v-if="isLoading">
    <LoadingSpinner />
  </div>
  <div v-if="!isEdit">
    <div class="error"><label class="alert">{{ err }}</label></div>
    <ProfileView v-if="profile" :profile="profile" :toggleEditMode="toggleEditMode" />
  </div>
  <div v-else>
    <ProfilePatch v-if="profile" :profile="profile" :toggleEditMode="toggleEditMode" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, onUnmounted, ref } from 'vue';
import useProfile from '../composables/useProfile';
import LoadingSpinner from 'src/components/Spinner.vue'
import ProfileView from 'src/components/ProfileView.vue'
import ProfilePatch from 'src/components/ProfilePatch.vue'
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'IndexPage',
  components: { LoadingSpinner, ProfileView, ProfilePatch },
  setup() {
    const isEdit = ref(false);
    const router = useRouter()
    const { getProfile, err, profile, isLoading } = useProfile();
    onBeforeMount(async () => {
      await getProfile()
      if (err.value) router.push('/signin')
    })
    onUnmounted(() => {
      profile.value = null;
    })
    const toggleEditMode = () => {
      isEdit.value = !isEdit.value;
    }
    return { profile, err, isLoading, toggleEditMode, isEdit };
  }
});
</script>

<style src="./pages.styles.css"></style>
