<template>
  <div class="horizontal">
    <div class="horizontal middle center">
      <router-link :to="getUserDashRoute">
        <font-awesome-icon icon="home" class="icon"></font-awesome-icon>
      </router-link>            
      <font-awesome-icon icon="coffee" class="icon"></font-awesome-icon>                   
    </div>        
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
        <router-link :to="getUserProfileRoute" class="vertical center">
          <avatar :src="getProfileImgUrl" :username="getUsername" :size="200" class="mb-4"></avatar>                
          <div class="horizontal middle">
            <h4 class="mr-2"><font-awesome-icon icon="edit"></font-awesome-icon></h4>
            <h4>{{ getUsername }}</h4>
          </div>          
        </router-link>
        <div class="v-space-20"></div>
        <div class="user-menu-area text-left">
          <customer-menu v-if="isCustomer"></customer-menu>
          <professional-menu v-if="isProfessional"></professional-menu>
          <div class="v-space-20"></div>    
          <div>
            <a class="clickable" @click="logout">            
              <h6>
                <font-awesome-icon class="mr-3" icon="sign-out-alt"></font-awesome-icon>
                Sair
              </h6>            
            </a>
          </div>                
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
      ...mapGetters(['getProfileImgUrl', 'getUserDashRoute', 'getUsername', 'getUserProfileRoute', 'isMenuOpened', 'isCustomer', 'isProfessional'])
    }
  }
</script>

<style lang="scss" scoped>
  [data-icon] {  
    @extend .clickable;
    font-size:    $large;
    margin-right: 30px !important;    
  }

  [data-icon="times"] {
    font-size:    $veryLarge;
    margin-right: 0;
  }  

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

        a {
          h4, h6 {
            color:    $white;
            &.fade    { opacity: 1; }
          }
        }

        .close {
          position: absolute;
          top: 10px;
          right: 10px;
          font-size: 72px;
          color: $white;
        }

        &.open {
            background: $brand;
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