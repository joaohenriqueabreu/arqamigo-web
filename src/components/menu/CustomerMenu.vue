<template>
  <div>
    <router-link to="/customer">
      <h6>
        <font-awesome-icon class="mr-3" icon="project-diagram"></font-awesome-icon>        
        Painel
      </h6>
    </router-link>
    <div class="v-space-20"></div>
    <router-link to="/customer/rooms">
      <h6>
        <font-awesome-icon class="mr-3" icon="home"></font-awesome-icon>
        Meus ambientes
      </h6>
    </router-link>  
    <div class="v-space-20"></div>
    <router-link to="/customer/rooms">
      <h6>
        <font-awesome-icon class="mr-3" icon="coffee"></font-awesome-icon>
        Dicas recebidas
      </h6>
    </router-link>      
    <div class="v-space-20"></div>
    <router-link to="/customer/professionals">
      <h6>
        <font-awesome-icon class="mr-3" icon="ruler"></font-awesome-icon>
        Pesquisar profissionais
      </h6>
    </router-link>        
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
  a {
    h6 {
      @extend .bold;
      color: $white !important;
    }
  }
</style>