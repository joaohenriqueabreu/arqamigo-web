<template>
  <div>
    <div class="row">
      <div class="col-sm-6 offset-sm-3">
        <div class="card shadow">
          <div class="card-header text-center">
            <h4 class="color-white bold">Login</h4>
          </div>
          <div class="card-body text-center">
            <form>
              <div class="group text-left">
                <label for="email">Email</label>
                <input type="email" v-model="email" name="email">
              </div>                     
              <div class="group text-left">
                <label for="password">Senha</label>
                <input type="password" v-model="password" name="password">
              </div>      
              <div class="form-group">
                <button type="submit" @click.prevent="customerLogin">Entrar</button>                                                  
                <div class="mb-1"></div>
                <router-link to="forgot-password"><small class="bold">Esqueceu sua senha?</small></router-link>
              </div>                         
              <hr>              
              <div class="form-group vertical">
                <small>Ou se preferir, utilize uma de suas redes socias para entrar</small>
                <div class="mb-2"></div>
                <div class="horizontal center">
                  <button @click.prevent="professionalLogin" class="facebook mr-2">
                    <font-awesome-icon :icon="['fab', 'facebook']"></font-awesome-icon>
                    Facebook
                  </button>                  
                  <button @click.prevent="professionalLogin" class="google mr-2">
                    <font-awesome-icon :icon="['fab', 'google']"></font-awesome-icon>
                    Google
                  </button>
                  <button @click.prevent="professionalLogin" class="linkedin">
                    <font-awesome-icon :icon="['fab', 'linkedin']"></font-awesome-icon>
                    Linkedin
                  </button>
                </div>                
              </div>
            </form>  
          </div>
        </div>    
     </div>
   </div>   
 </div>
</template>

<script>
import {mapGetters} from 'vuex';
  export default {
    data(){
      return {
        email : "",
        password : ""
      }
    },  
    methods: {
      customerLogin: function () {
        this.login('customer');
      },
      professionalLogin: function () {
        this.login('professional');
      },
      login: function (user) {
       this.$store.dispatch('login', user);
      }
    },
    computed: mapGetters(['isLoggedIn'])
  }
</script>

<style lang="scss" scoped>
.card-header {
  background-color: $brand;
  color: $white;
  font-weight: $bold;
}

[data-icon] {
  color:        $white;
  margin-right: 10px;
}

button {
  @extend .color-white, .shadower;
  min-width: 10vw !important;  
}

.facebook {
  background: $facebook !important;  
}

.google {
  background: $google !important;  
}

.linkedin {
  background: $linkedin;
}
</style>