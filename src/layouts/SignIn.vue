<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          <RouterLink to="/">Profile</RouterLink>
        </q-toolbar-title>
        <nav>
          <RouterLink to="/signin">Sign in</RouterLink>
          <RouterLink to="/signup">Sign up</RouterLink>
          <RouterLink to="/signin">Log out</RouterLink>
        </nav>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer>
      <div class="footer"><span>Made by</span> <a class="author" href="https://github.com/elem15" target="_blank"><img
            src="/icons/github.svg" alt="github" width="20" /> elem15 </a>
        <span>©</span>
      </div>
    </q-footer>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  name: 'MainLayout',

  components: {

  },

  setup() {
    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
});
</script>

<style scoped>
.footer {
  font-size: 1rem;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}

.author {
  display: flex;
  text-decoration: none;
  color: azure;
}

nav {
  font-size: 1rem;
  text-align: center;
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
  justify-content: center;
  ;
}

a.router-link-exact-active {
  text-decoration: none;
  color: #fff;
}

a.router-link-exact-active:hover {
  color: rgb(241, 220, 241);
}

a {
  display: inline-block;
  color: darkblue;
  text-decoration: none;
}

a:hover {
  color: plum;
}

a:first-of-type {
  border: 0;
}
</style>
