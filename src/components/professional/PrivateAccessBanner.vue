<template>
  <div>
      <div class="full-width bg-brand vertical middle center shadow p-4">
        <h6 class="color-white horizontal">
            Ótimas noticias! {{ customer.name }} autorizou seu contato.            
        </h6>
        <div class="horizontal middle">            
            <router-link :to="`/professional/customers/${customer.id}`">     
                <font-awesome-icon icon="user" class="mr-1 color-white"></font-awesome-icon>
                <span>Clique aqui para ver o perfil do cliente</span>
            </router-link>
            <span>ou</span>
            <a target="_blank" :href="`https://wa.me/${customer.private.zapphone}`" class="bold horizontal">
                <font-awesome-icon :icon="['fab', 'whatsapp']" class="mr-1 color-white"></font-awesome-icon>
                <span>Contine a conversa no WhatsApp</span>
            </a>                                                                           
        </div>                                        
    </div>    
  </div>
</template>

<script>
export default {
    props: {
        customer: Object
    }
}
</script>

<style lang="scss" scoped>
    span {
        @extend .bold, .color-white;
        font-size: $small;
        margin-right: 5px;
    }
</style>