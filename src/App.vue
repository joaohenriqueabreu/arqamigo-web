<template>
  <div class="skeleton" v-bind:class="[getNavbarStyle]">
    <header v-bind:class="[getNavbarStyle]">
      <top-navbar></top-navbar>
    </header>    
    <main v-bind:class="[getContainerStyle, getNavbarStyle]">
      <fade-transition :duration="500">
        <router-view></router-view>
      </fade-transition>
    </main>
    <footer>
      <bottom-footer v-if="! isLoggedIn"></bottom-footer>
    </footer>    
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { FadeTransition }         from 'vue2-transitions'
import Navbar                     from '@/components/menu/Navbar.vue';
import Footer                     from '@/components/layout/Footer.vue';

export default {
  name: 'app',
  components: {
    'top-navbar':       Navbar,
    'bottom-footer':    Footer,
    'fade-transition':  FadeTransition
  },
  computed: {
    ...mapGetters(['getNavbarStyle', 'getContainerStyle', 'isLoggedIn'])
  }
};
</script>

<style lang='scss'>
  .skeleton {
    position:       relative;
    min-height:     100vh;
    
    &.fancy {
      background: gradient($white, $brand);
    }
  }

  header {
    background:     $white;
    position:       fixed;
    width:          100%;    
    z-index:        $above;    

    &.transparent, &.fancy {
      position:       relative;      
      padding-bottom: 0vh;
    }
  }

  main {    
    // @extend .vertical, .middle, .center;
    min-height:     60vh;    
    padding-top:    15vh;
    padding-bottom: 30vh;
    z-index:        0;

    &.transparent {
      padding-top: 0vh;
      min-height:  80vh;
    }
    
    &.fancy {      
      // Footer is ugly, hide it in first sight
      min-height:   150vh;
      padding-top:  2vh;      
    }

    &.no-container {
      padding-bottom: 0;
      &:first-child {
        margin:   0;
        padding:  0;
        width:    100%;
      }
    }
  }
  
  footer {
    position: absolute;
    bottom:   0;
    left:     0;
    width:    100%;
  }
</style>