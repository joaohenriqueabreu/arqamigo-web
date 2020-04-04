<template>
  <div class="horizontal middle center">
      <button @click="$modal.show('authorize')">
        <font-awesome-icon :icon="['fab', 'whatsapp']" class="mr-2 color-white"></font-awesome-icon>
        <h6 class="color-white bold">Autorizar contato do profissional</h6>
    </button>
    <button @click="$modal.show('thanks')">
        <font-awesome-icon icon="heart" class="mr-2 color-white"></font-awesome-icon>
        <h6 class="color-white bold">Agradecer dicas</h6>
    </button>
    <button @click="$modal.show('block')">
        <font-awesome-icon :icon="['far', 'frown']" class="mr-2 color-white"></font-awesome-icon>
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
            <p><span @click="authorize()">Clique aqui para autorizar</span></p>
        </div>        
    </modal>
    <modal name="thanks" :adaptive="true" :clickToClose="true" height="auto">
        <div class="p-5 vertical center">
            <p>Obrigado pelo feedback!</p>                    
            <rate-professional :consulting="consulting" :shouldGiveFeedback="true" class="full-width"></rate-professional>            
            <div class="mb-4"></div>
            <p><span @click="close()">Encerrar conversa</span></p>
        </div>        
    </modal>
    <modal name="block" :adaptive="true" :clickToClose="true" height="auto">
        <div class="p-5 vertical center">
            <p>É uma pena ouvir isso. Nos conte um pouco mais do que aconteceu.</p>                    
            <rate-professional :consulting="consulting" :shouldGiveFeedback="true" class="full-width"></rate-professional>            
            <div class="mb-4"></div>
            <p><span @click="blockProfessional(consulting.professional)">Bloquear</span></p>
        </div>        
    </modal>
  </div>
</template>

<script>
import RateProfessional from '@/components/consulting/Rate';
import { mapActions, mapGetters } from 'vuex';
export default {
    components: {
        'rate-professional': RateProfessional
    },
    props: {
        consulting: Object
    },
    methods: {
        ...mapActions(['authorizeProfessional', 'closeConsulting', 'blockProfessional']),
        async authorize() {            
            await this.authorizeProfessional(this.consulting.professional);
            this.$modal.hide('authorize');
            this.$swal('Obrigado!');
        },  
        close () {
            this.closeConsulting({ 
                consulting: this.consulting, 
                feedback:   this.getFeedback 
            })
        }
    },
    computed: {
        ...mapGetters(['getFeedback'])
    }
}
</script>

<style lang="scss" scoped>
  button {
    @extend .horizontal, .center, .middle, .bg-brand, .rounded-pill, .shadow, .shadower, .color-white;
    padding:      $space;
    margin-right: $space;
    h6 {
        margin-bottom:  0;
        margin-right:   $space;
    }
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