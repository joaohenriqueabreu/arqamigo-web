<template>
  <div>
      <div class="full-width bg-brand vertical middle center shadow p-4">
        <h6 class="color-white horizontal">
            Ótimas noticias! {{ customer.name }} autorizou seu contato.
            <font-awesome-icon :icon="['far', 'question-circle']" class=" ml-2 clickable" @click="$modal.show('whatDoesItMean')"></font-awesome-icon>
        </h6>
        <div class="horizontal middle">            
            <router-link :to="`/professional/customer/${customer.id}`">     
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
    <modal name="whatDoesItMean" :adaptive="true" :clickToClose="true" height="auto">
        <div class="p-5 vertical center">
        <p>
            O cliente ainda não liberou o seu contato por isso essa informação continuará invisível por enquanto.
            Continue se engajando com o cliente para que ele faça o contato offline com você!            
        </p>
        <p>
            <a href="http://google.com.br" target="_blank">Veja mais dicas de como se engajar com os clientes</a>
        </p>
        </div>        
    </modal>
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