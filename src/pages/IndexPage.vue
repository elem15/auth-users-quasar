<template>
  <q-page class="column items-start justify-start" v-if="profile">
    <h5>Email: {{ profile.email }}</h5>
    <p v-if="profile.name">Name: {{ profile.name }}</p>
    <p v-if="profile.phone">Phone: {{ profile.phone }}</p>
    <p v-if="profile.address">Address: {{ profile.address }}</p>
    <p v-if="profile.about">About: {{ profile.about }}</p>
  </q-page>
</template>

<script lang="ts">
import { Ref, defineComponent, onMounted, ref } from 'vue';
import useProfile from '../composables/useProfile';

export default defineComponent({
  name: 'IndexPage',
  components: {},
  setup() {
    const { getProfile, err, profile } = useProfile();
    onMounted(async () => {
      await getProfile()
    })
    console.log(profile)
    return { profile };
  }
});
</script>
