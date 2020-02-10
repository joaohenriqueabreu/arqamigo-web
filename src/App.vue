<template>
  <div>
    <header>
      <top-navbar></top-navbar>
    </header>
    <main class="container">
      <router-view></router-view>
    </main>
    <bottom-footer></bottom-footer>
  </div>
</template>

<script>
import Navbar from '@/components/menu/Navbar.vue';
import Footer from '@/components/layout/Footer.vue';

export default {
  name: 'app',
  components: {
    'top-navbar': Navbar,
    'bottom-footer': Footer
  },
};
</script>

<style lang='scss'>
@import '@/assets/styles/main.scss';

  header {
    background: $white;
  }

  main {
    min-height: 100vh;
    padding-top: 10vh;
    padding-bottom: 10vh;
  }
</style>