<template>
  <div>
    <header v-bind:class="[getNavbarStyle]">
      <top-navbar></top-navbar>
    </header>
    <main class="container" v-bind:class="[getNavbarStyle]">
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
    ...mapGetters(['getNavbarStyle', 'isLoggedIn'])
  }
};
</script>

<style lang='scss'>

  header {
    background:     $white;
    position:       fixed;
    width:          98.79vw;    
    z-index:        $above;
    padding-bottom: 15vh;

    &.transparent {
      position:       relative;
      padding-bottom: 0vh;
    }
  }

  main {    
    min-height: 100vh;    
    padding-bottom: 20vh;
    z-index: 0;

    &.alt {
      padding-top: 20vh;
    }
  }  
</style>