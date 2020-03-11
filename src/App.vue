<template>
  <div>
    <header>
      <top-navbar></top-navbar>
    </header>
    <main class="container" v-bind:class="{ 'extra-padding': hasPageSubtitle }">
      <router-view></router-view>
    </main>
    <bottom-footer v-if="! isLoggedIn"></bottom-footer>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Navbar from '@/components/menu/Navbar.vue';
import Footer from '@/components/layout/Footer.vue';

export default {
  name: 'app',
  components: {
    'top-navbar': Navbar,
    'bottom-footer': Footer
  },
  computed: {
    ...mapGetters(['hasPageSubtitle', 'isLoggedIn'])
  }
};
</script>

<style lang='scss'>
@import '@/assets/styles/main.scss';
  header {
    background: $white;
    position: fixed;
    width: 100vw;    
    z-index: 1020;
  }

  main {    
    min-height: 100vh;
    padding-top: 15vh;
    padding-bottom: 20vh;
    z-index: 0;

    &.extra-padding {
      padding-top: 20vh;
    }
  }  
</style>