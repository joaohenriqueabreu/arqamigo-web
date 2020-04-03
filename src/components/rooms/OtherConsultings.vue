<template>
  <perfect-scrollbar>
    <h6 class="p-2 color-brand bold">Outras dicas recebidas</h6>                
    <div class="mb-3"></div>
    <div v-for="consulting in consultings" :key="consulting.id" class="mb-3 px-2 consulting-pill">
        <router-link :to="{ name: 'customer.rooms.consulting', params: {id: consulting.id}}">
        <div class="horizontal justify-content-between middle mb-2">
            <div class="horizontal middle single-line">
            <avatar :src="consulting.professional.photo" :username="consulting.professional.name" class="mr-2"></avatar>
            <span>{{ consulting.professional.name }}</span>
            </div>
            <div class="rounded-circle shadow px-3 py-2 mr-2 color-brand bold bg-white negative">
            <span>{{ consulting.num_comments }}</span>                                          
            </div>                    
        </div>                                    
        <hr class="m-0" />
        </router-link>                  
    </div>                                               
  </perfect-scrollbar>
</template>

<script>
export default {
  props: {
    consultings: Array
  }
}
</script>

<style lang="scss" scoped>
.consulting-pill {
    @extend .vertical, .clickable, .bold;
    color: $gray !important;
    &:hover {
      @extend .transition-ease, .shadow;
      background: $lightPink;
      color:      $white !important;
    }
  }
</style>