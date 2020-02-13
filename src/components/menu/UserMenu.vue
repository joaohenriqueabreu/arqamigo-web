<template>
  <div>
    <span class="clickable" @click="toggleMenu">
      <hover-overlay :rounded="true" icon="bars">
        <avatar :src="getProfileImgUrl" :username="getUsername"></avatar>  
      </hover-overlay>
    </span>    
    <div class="fs-menu" v-bind:class="{ open: isMenuOpened }">
      <div class="close">                
        <span class="clickable margin-30" @click="toggleMenu">
          <font-awesome-icon icon="times"></font-awesome-icon>            
        </span>
      </div>
      <div class="text-center vertical center">
        <avatar :src="getProfileImgUrl" :username="getUsername" :size="200"></avatar>
        <div class="v-space-20"></div>
        <router-link to="/user/profile">
          <h2>{{ getUsername }}</h2>
        </router-link>
        <div class="v-space-20"></div>
        <div class="text-left">
          <customer-menu v-if="isCustomer"></customer-menu>
          <professional-menu v-if="isProfessional"></professional-menu>
          <div class="v-space-20"></div>
          <a class="clickable" @click="logout">            
            <h3>
              <font-awesome-icon class="mr-3" icon="sign-out-alt"></font-awesome-icon>
              Sair
            </h3>
          </a>
        </div>        
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import CustomerMenu from '@/components/menu/CustomerMenu';
import ProfessionalMenu from '@/components/menu/ProfessionalMenu';

  export default {    
    methods: {          
      ...mapActions(['toggleMenu']),  
      logout: function () {
        this.$store.dispatch('logout')        
      },          
    },
    components: {
      'customer-menu': CustomerMenu,
      'professional-menu': ProfessionalMenu
    },
    computed: {
      ...mapGetters(['getProfileImgUrl', 'getUsername', 'isMenuOpened', 'isCustomer', 'isProfessional'])
    }
  }
</script>

<style lang="scss">
  .fs-menu {
        position: fixed;
        background: transparent;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        width: 100%;
        flex-direction: column;
        clip-path: circle(100px at 90% -10%);
        -webkit-clip-path: circle(100px at 90% -10%);
        transition: all 2s ease-out;
        pointer-events: none;
        top: 0;
        left: 0;

        h2, h3 {
            color: $white;
            opacity: 0;
            a { font-size: 25px; }
            &.fade { opacity: 1; }
        }

        .close {
          position: absolute;
          top: 10px;
          right: 10px;
          font-size: 72px;
          color: $white;
        }

        &.open {
            background: $pink;
            clip-path: circle(300vh at 50% 0%);
            -webkit-clip-path: circle(300vh at 50% 0%);
            pointer-events: all;
            opacity: 0.97;
            h2, h3, h4, h5 {
              opacity: 1;
            }
        }
    }
</style>