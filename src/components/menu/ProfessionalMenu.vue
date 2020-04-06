<template>
  <div>
    <router-link to="/professional">
      <h6>
        <font-awesome-icon class="mr-3" icon="project-diagram"></font-awesome-icon>        
        Painel
      </h6>
    </router-link>
    <div class="v-space-20"></div>
    <router-link to="/professional/customers">
      <h6>
        <font-awesome-icon class="mr-3" icon="coffee"></font-awesome-icon>
        Meus clientes
      </h6>
    </router-link>      
    <div class="v-space-20"></div>
    <router-link to="/professional/consultings">
      <h6>
        <font-awesome-icon class="mr-3" icon="ruler"></font-awesome-icon>
        Minhas consultorias
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
      color: $white !important;
    }
  }
</style>