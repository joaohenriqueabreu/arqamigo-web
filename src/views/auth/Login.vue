<template>
  <div>
    <div class="row">
      <div class="col-sm-6 offset-sm-3">
        <div class="card shadow">
          <div class="card-header text-center">
            <h4>Login</h4>
          </div>
          <div class="card-body text-center">
            <form>
              <div class="group text-left">
                <label for="email">Email</label>
                <input type="email" v-model="email" name="email">
              </div>                     
              <div class="group text-left">
                <label for="password">Password</label>
                <input type="password" v-model="password" name="password">
              </div>      
              <div class="form-group">
                <button type="submit" @click.prevent="customerLogin">Submit</button>                                  
                <span class="h-space-10"></span>
                <router-link to="forgot-password">Esqueceu sua senha?</router-link>
              </div>                         
              <div class="form-group horizontal center">
                <button @click.prevent="professionalLogin" class="facebook">
                  <font-awesome-icon :icon="['fab', 'facebook']" class="icon alt"></font-awesome-icon>
                  Facebook
                </button>
                <div class="h-space-10"></div>
                <button @click.prevent="professionalLogin" class="google">
                  <font-awesome-icon :icon="['fab', 'google']" class="icon alt"></font-awesome-icon>
                  Google
                </button>
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

<style lang="scss">
  .card-header {
    background-color: $pink;
    color: $white;
    font-weight: $bold;
  }

.facebook {
  background-color: darkslateblue !important;  
  color: white;
  min-width: 10vw !important;
}

.google {
  background-color:indianred !important;  
  color: white;
  min-width: 10vw !important;
}
</style>