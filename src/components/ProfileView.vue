<template>
  <q-page class="column items-center justify-start">
    <section>
      <h1 class="text-h5">User profile</h1>
      <div>
        <h6>email:</h6>
        <p>{{ email }}</p>
      </div>
      <div v-if="name">
        <h6>name</h6>
        <p>{{ name }}</p>
      </div>
      <div v-if="phone">
        <h6>phone</h6>
        <p>{{ phone }}</p>
      </div>
      <div v-if="address">
        <h6>address</h6>
        <p>{{ address }}</p>
      </div>
      <div v-if="about">
        <h6>about</h6>
        <p>{{ about }}</p>
      </div>
      <div class="button-wrapper">
        <button @click="toggleEditMode">Edit profile</button>
      </div>
    </section>
  </q-page>
</template>
<script>
import { defineComponent, toRefs } from 'vue';

export default defineComponent({
  name: 'ProfileView',
  props: ['profile', 'toggleEditMode'],
  setup(props) {
    const { name, phone, address, about, email } = toRefs(props.profile);
    return { name, phone, address, about, email };
  }
});
</script>


<style scoped>
h6 {
  margin: 0;
}

section {
  width: 18rem;
}

p {
  padding: 10px;
}
</style>

