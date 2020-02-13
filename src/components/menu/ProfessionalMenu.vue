<template>
  <div>
    <router-link to="/professional">
      <h3>
        <font-awesome-icon class="mr-3" icon="project-diagram"></font-awesome-icon>        
        Painel
      </h3>
    </router-link>
    <div class="v-space-20"></div>
    <router-link to="/professional/customers">
      <h3>
        <font-awesome-icon class="mr-3" icon="coffee"></font-awesome-icon>
        Meus clientes
      </h3>
    </router-link>      
    <div class="v-space-20"></div>
    <router-link to="/professional/consultings">
      <h3>
        <font-awesome-icon class="mr-3" icon="ruler"></font-awesome-icon>
        Minhas consultorias
      </h3>
    </router-link>        
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>