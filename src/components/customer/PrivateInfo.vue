<template>
  <div>
      <div @click="openModal">
        <hover-overlay icon="lock">
            <span v-for="char in getRandomChars()" :key="char" class="mr-1">*</span>
        </hover-overlay>
      </div>      
      <modal :name="modalId" :adaptive="true" :clickToClose="true" height="auto">
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
import { v4 as uuidv4 } from 'uuid';
const MAX_CHARS = 8;
const MIN_CHARS = 5;
export default { 
    data() {
        return {
            modalId: ''
        }
    },
    mounted() {
        this.modalId = uuidv4();
    },
    methods: {
        getRandomChars: () => (Math.round(Math.random() * 10) % MAX_CHARS) + MIN_CHARS,
        openModal() { this.$modal.show(this.modalId); }
    },
}
</script>

<style lang="scss" scoped>
    span {
        font-weight: $bold;        
        color: $lightGray;  
    }
</style>