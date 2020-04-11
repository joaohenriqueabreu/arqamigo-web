<template>
  <div class="horizontal">
    <div class="horizontal middle center">
      <router-link :to="{ name: getUserDashRoute }">
        <font-awesome-icon icon="home" class="icon mr-3"></font-awesome-icon>
      </router-link>            
      <font-awesome-icon icon="coffee" class="icon mr-3"></font-awesome-icon>                   
    </div>        
    <span class="clickable" @click="toggleMenu">      
      <hover-overlay :rounded="true" icon="bars">
        <avatar :src="profileImgUrl" :username="username"></avatar>  
      </hover-overlay>
    </span> 
    
    <div class="fs-menu" v-bind:class="{ open: isMenuOpened }">
      <div class="close">                
        <span class="clickable margin-30" @click="toggleMenu">
          <font-awesome-icon icon="times"></font-awesome-icon>            
        </span>
      </div>
      <div class="text-center vertical center">
        <router-link :to="{ name: getUserProfileRoute }" class="vertical center">
          <avatar :src="profileImgUrl" :username="username" :size="200" class="mb-4"></avatar>                
          <div class="horizontal middle">
            <h4 class="mr-3"><font-awesome-icon icon="edit"></font-awesome-icon></h4>
            <h4>{{ username }}</h4>
          </div>          
        </router-link>
        <div class="v-space-20"></div>
        <div class="user-menu-area text-left">
          <customer-menu v-if="isCustomer"></customer-menu>
          <professional-menu v-if="isProfessional"></professional-menu>
          <div class="v-space-20"></div>    
          <div>
            <a class="clickable" @click="internalLogout()">            
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
import { mapGetters, mapActions, mapState } from 'vuex'
import CustomerMenu from '@/components/menu/CustomerMenu'
import ProfessionalMenu from '@/components/menu/ProfessionalMenu'
  export default {    
    components: {
      'customer-menu':      CustomerMenu,
      'professional-menu':  ProfessionalMenu
    },
    methods: {          
      ...mapActions(['toggleMenu', 'logout']),
      internalLogout() {
        this.logout();
        this.$router.push('/logout');
      }
    },
    computed: {
      ...mapState({
        profileImgUrl: state => state.auth.user.photo,
        username: state => state.auth.user.public_name,
      }),
      ...mapGetters(['getUserDashRoute', 'getUserProfileRoute', 'isMenuOpened', 'isCustomer', 'isProfessional'])
    }
  }
</script>

<style lang="scss" scoped>
  [data-icon] {  
    @extend .clickable;
    font-size:    $large;
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