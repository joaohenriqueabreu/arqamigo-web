<template>
  <div>
    <nav class="navbar" v-bind:class="{ shadow: ! hasPageSubtitle, alt: hasPageSubtitle }" role="navigation">    
      <aside class="float-left">
        <router-link to="/" class="navbar-brand horizontal-center align-left">
          <h1 class="color-pink">Reforma Aí</h1>
        </router-link>
      </aside>
      <aside>
      </aside>
      <aside class="float-right">
        <user-menu v-if="isLoggedIn"></user-menu>
        <guest-menu v-else></guest-menu>
      </aside>    
    </nav>  
    <!-- <nav class="alt shadow subtitle vertical center middle" v-if="hasPageSubtitle">
      <h2>{{ getPageSubtitle }}</h2>      
    </nav> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import UserMenu from './UserMenu.vue';
import GuestMenu from './GuestMenu.vue';

export default {
  data() {
    return { };
  },
  components: {
    'user-menu': UserMenu,
    'guest-menu': GuestMenu,
  },
  computed: mapGetters(['isLoggedIn','hasPageSubtitle', 'getPageSubtitle']),
};
</script>

<style lang="scss" scoped>
  nav {    
    top: 0;
    left: 0;        
    padding-right: 30px;    
    padding-left: 30px;    
    z-index: 1020;

    &.alt {
      background: $pink;
      border: none;
      h1, h2 {
        color: $white !important;
      }      
    }

    &.subtitle {
      height: 15vh;
      padding: 20px;   
      z-index: 0;   
    }
  }
</style>
