<template>
  <nav class="navbar shadow" role="navigation">
    <aside class="float-left">
      <router-link to="/" class="navbar-brand horizontal-center align-left">
        <h1 class="color-pink">Arqui Amigos</h1>
      </router-link>
    </aside>
    <aside>
    </aside>
    <aside class="float-right">
      <user-menu v-if="isLoggedIn"></user-menu>
      <guest-menu v-else></guest-menu>
    </aside>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';
import UserMenu from './User.vue';
import GuestMenu from './Guest.vue';

export default {
  data() {
    return { };
  },
  components: {
    'user-menu': UserMenu,
    'guest-menu': GuestMenu,
  },
  computed: mapGetters(['isLoggedIn']),
};
</script>

<style lang="scss" scoped>
  nav {
    position: sticky;
    top: 0;
    left: 0;    
    width: 100%;
  }
</style>
