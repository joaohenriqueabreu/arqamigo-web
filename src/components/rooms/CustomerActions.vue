<template>
  <div class="horizontal middle center">
      <button @click="$modal.show('authorize')">
        <font-awesome-icon :icon="['fab', 'whatsapp']" class="mr-2 color-white"></font-awesome-icon>
        <h6 class="color-white bold">Autorizar contato do profissional</h6>
    </button>
    <button>
        <font-awesome-icon :icon="['fab', 'whatsapp']" class="mr-2 color-white"></font-awesome-icon>
        <h6 class="color-white bold">Agradecer dica</h6>
    </button>
    <button>
        <font-awesome-icon :icon="['fab', 'whatsapp']" class="mr-2 color-white"></font-awesome-icon>
        <h6 class="color-white bold">Bloquear profissional</h6>
    </button>
    <modal name="authorize" :adaptive="true" :clickToClose="true" height="auto">
        <div class="p-5 vertical center">
        <p>
            Ótimas noticias! Dessa forma você e o profissional poderão avançar nas conversar para fazerem um projeto juntos!
        </p>
        <p>
            Observe que ao autorizar o contato do profissional, suas informações pessoais (como email, telefone e localização aproximada) ficarão visiveis para ele ou ela.            
        </p>        
        <rate-professional :consulting="consulting" :shouldGiveFeedback="true" class="full-width"></rate-professional>
        <div class="mb-4"></div>
        <p><span @click="authorizeContact()">Clique aqui para autorizar</span></p>
        </div>        
    </modal>
    <modal name="thank" :adaptive="true" :clickToClose="true" height="auto">
        <div class="p-5 vertical center">
        <p>
            O cliente ainda não liberou o seu contato por isso essa informação continuará invisível por enquanto.
            Continue se engajando com o cliente para que ele faça o contato offline com você!            
        </p>
        <p><a href="http://google.com.br" target="_blank">Veja mais dicas de como se engajar com os clientes</a>
        </p>
        </div>        
    </modal>
    <modal name="block" :adaptive="true" :clickToClose="true" height="auto">
        <div class="p-5 vertical center">
        <p>
            O cliente ainda não liberou o seu contato por isso essa informação continuará invisível por enquanto.
            Continue se engajando com o cliente para que ele faça o contato offline com você!            
        </p>
        <p><a href="http://google.com.br" target="_blank">Veja mais dicas de como se engajar com os clientes</a>
        </p>
        </div>        
      </modal>
  </div>
</template>

<script>
import RateProfessional from '@/components/consulting/Rate';
import { mapActions } from 'vuex';
export default {
    components: {
        'rate-professional': RateProfessional
    },
    props: {
        consulting: Object
    },
    methods: {
        ...mapActions(['authorizeProfessional']),
        async authorizeContact() {
            await this.authorizeProfessional(this.consulting.professional, this.consulting.room.customer);
            this.$modal.hide('authorize');
        },        
    }
}
</script>

<style lang="scss" scoped>
  button {
    @extend .horizontal, .center, .middle, .bg-brand, .rounded-pill, .shadow, .shadower, .color-white;
    padding:      $space;
    margin-right: $space;
  }

  p {
      font-size: $small;
  }

   /deep/ p {
       font-size: $small;
   }
  span {
      @extend .color-white, .bg-brand, .shadow, .shadower, .rounded-pill, .bold, .clickable, .transition-ease;
      padding: 2*$space;      
      font-size: $normal !important;
      &:hover {
          @extend .transition-ease;
          color: $lightPink;
      }
  }
</style>