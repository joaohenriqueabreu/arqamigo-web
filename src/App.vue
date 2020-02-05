<template>
  <div id="app">
    <header>
      <Navbar></Navbar>
    </header>
    <main>
      <route-view></route-view>
    </main>
    <footer>
      
    </footer>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';

export default {
  name: 'app',
  components: {
    Navbar,
    // BottomBar,
  },
};
</script>

<style>
/* #app { */
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
/* } */
</style>
