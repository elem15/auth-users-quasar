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
          <button @click="handleLogout" class="link">Log out</button>
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
import useLogOut from 'src/composables/useLogOut';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
export default defineComponent({
  name: 'MainLayout',
  setup() {
    const router = useRouter();
    const { err, logOut } = useLogOut()
    const handleLogout = async () => {
      await logOut();
      if (!err.value) router.push('/signin')
    }
    return {
      handleLogout
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

.link {
  display: inline-block;
  color: darkblue;
  border: none;
  background: inherit;
  margin: 0;
  padding: 0;
}

.link:hover {
  color: plum;
}

a:first-of-type {
  border: 0;
}
</style>
