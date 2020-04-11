<template>
  <div>
    <nav class="navbar" v-bind:class="[navbarStyle]" role="navigation">    
      <aside class="float-left">
        <router-link to="/" class="navbar-brand horizontal-center align-left">
          <h1 class="color-brand">Reforma Aí</h1>
        </router-link>
      </aside>
      <aside>
      </aside>
      <aside class="float-right">
        <user-menu v-if="isLoggedIn"></user-menu>
        <guest-menu v-else></guest-menu>
      </aside>    
    </nav>  
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import UserMenu from './UserMenu.vue'
import GuestMenu from './GuestMenu.vue'

export default {
  data() {
    return { }
  },
  components: {
    'user-menu': UserMenu,
    'guest-menu': GuestMenu,
  },
  computed: {
    ...mapState({ navbarStyle: state => state.layout.navbarStyle }),
    ...mapGetters(['isLoggedIn'])
  }
}
</script>

<style lang="scss" scoped>
  nav {    
    @extend .shadow;
    top:            0;
    left:           0 ;       
    padding-right:  30px    ;
    padding-left:   30px;    
    z-index:        $above    ;

    &.alt {
      background: $brand;
      border: none;
      h1, h2 {
        color: $white !important;
      }      
    }

    &.transparent {
      position:   relative;
      background: $darkWhite;
      border:     none;
      box-shadow: none;      
      z-index:    0;
    }

    &.fancy {
      background: gradient($white, $brand);
      box-shadow: none;
      border: none;
      /deep/ [data-icon] {
        color: $white;
      }      
    }

    &.subtitle {
      height: 15vh;
      padding: 20px;   
      z-index: 0;   
    }
  }
</style>
