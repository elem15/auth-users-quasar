<template>
  <q-page class="column items-center justify-start">
    <main>
      <h5>User profile</h5>
      <p>email: {{ email }}</p>
      <p v-if="name">name: {{ name }}</p>
      <p v-if="phone">phone: {{ phone }}</p>
      <p v-if="address">address: {{ address }}</p>
      <p v-if="about">about: {{ about }}</p>
      <button @click="goToProfilePatch">Edit profile</button>
    </main>
  </q-page>
</template>
<script>
import { defineComponent, toRefs } from 'vue';

export default defineComponent({
  name: 'ProfileView',
  props: ['profile', 'goToProfilePatch'],
  setup(props) {
    const { name, phone, address, about, email } = toRefs(props.profile);
    return { name, phone, address, about, email };
  }
});
</script>

