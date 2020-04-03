<template>
  <div class="vertical middle center">
    <h2 class="mb-5">Vamos começar!</h2>
    <div class="vertical middle center">
      <div class="col-sm-2"></div>
      <div class="col-sm-8 horizontal middle center justify-content-between">              
          <div class="vertical middle center text-center">
          <div class="main-info shadow vertical middle center mb-4">
              <font-awesome-icon icon="ruler-horizontal"></font-awesome-icon>               
          </div>
          <h4>Detalhe sua necessidade</h4>
          </div>  
          <div class="vertical middle center text-center">
          <div class="main-info shadow vertical middle center mb-4">
              <font-awesome-icon icon="clipboard-check"></font-awesome-icon>
          </div>
          <h4>Receba dicas gratuitamente</h4>
          </div>
          <div class="vertical middle center text-center">
          <div class="main-info shadow vertical middle center mb-4">
              <font-awesome-icon icon="tools"></font-awesome-icon>
          </div>
          <h4>Comece sua reforma!</h4>
          </div>            
      </div> 
    </div>          
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.main-info {
    border-radius: 400px;
    border: 10px solid $brand;      
    height: 120px;
    width: 120px;
    background: $white;
    color: $brand;
    font-size: $veryLarge;

    &:hover {
      @extend .transition-ease;
      color: $white;
      background: $brand;
    }
  }
</style>