<template>
  <div>    
      <router-link to="about" class="navbar-brand horizontal-center align-left">
        <h5>Sobre</h5>
      </router-link>
      <router-link to="login" class="navbar-brand horizontal-center align-left">
        <h5>Login</h5>
      </router-link>
      <router-link to="register" class="navbar-brand horizontal-center align-left">
        <h5>Cadastrar</h5>
      </router-link>      
  </div>  
</template>

<script>
export default { }
</script>

<style lang="scss" scoped>
  h5 {
    @extend .color-white, .bold;    

    &:hover {      
      @extend .transition-ease, .color-light-pink;
    }
  }
</style>