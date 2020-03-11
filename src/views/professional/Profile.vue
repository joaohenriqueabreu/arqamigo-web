<template>
  <div>
    <profile-img :img_url="getProfileImgUrl"></profile-img>
    <div class="v-space-50"></div> 
    <div class="shadow section">
      <div class="horizontal center">
        <h4>Perfil</h4>
      </div>
      <div class="row">
        <div class="col-sm-2"></div>
        <div class="col-sm-8">
          <form @submit.prevent="saveProfile">
            <div class="group">
              <label for="company_name">Nome da empresa</label>
              <input type="text" v-model="getUser.company_name">              
            </div>
            <div class="group">
              <label for="name">Nome da completo</label>
              <input type="text" v-model="getUser.name" @keyup="setName($event.target.value)">
              <div v-if="$v.getUser.name.$error">
                <div class="error" v-if="! $v.getUser.name.required">Entre com um nome</div>
              </div>
            </div>            
            <div class="group">
              <label for="cnpj">CNPJ</label>
              <input type="text" v-model="getUser.cnpj" v-on:blur="$v.getUser.cnpj.$touch();" v-mask="'##.###.###/####-##'">
              <div v-if="$v.getUser.cnpj.$error">
                <div class="error" v-if="! $v.getUser.cnpj.CNPJValidator">O formato correto deve ser ##.###.###/####-##</div>
              </div>
            </div>
            <div class="group">
              <label for="phone">Telefone</label>
              <input type="text" v-model="getUser.phone" v-on:blur="$v.getUser.phone.$touch();" v-mask="'(##) #####-####'">
              <div v-if="$v.getUser.phone.$error">
                <div class="error" v-if="! $v.getUser.phone.required && ! $v.getUser.phone.phoneValidator">Telefone inválido</div>
              </div>
            </div>
            <div class="group">
              <label for="name">Endereço Comercial</label>
              <input type="text" v-model="getUser.address" v-on:blur="$v.getUser.address.$touch();" v-mask="'(##) #####-####'">
              <div v-if="$v.getUser.address.$error">
                <div class="error" v-if="! $v.getUser.address.required && ! $v.getUser.address.phoneValidator">Entre com um endereço</div>
              </div>
            </div>
            <div class="vertical center middle">
              <submit-button ref="submit">Salvar</submit-button>
              <div class="v-space-10"></div>
              <div class="error" v-if="$v.$error">O formulário contém campos inválidos</div>
            </div>
          </form>
        </div>
      </div>            
    </div>
    <div class="v-space-50"></div> 
    <div class="shadow section text-center">
      <social-connect></social-connect>
      <div class="v-space-20"></div>       
    </div>   
    <div class="v-space-50"></div>
    <div class="shadow section text-center">
      // TODO fix lg screen btns overlapping with each other
      <send-docs></send-docs>
    </div>
  </div>
</template>

<script>
import MediaManager from '@/components/layout/MediaManager';
import SocialConnect from '@/components/professional/SocialConnect';
import SendDocuments from '@/components/professional/SendDocuments';
import { required } from 'vuelidate/lib/validators';
import { mapGetters, mapActions } from 'vuex';

export default {
    components: {
        'profile-img': MediaManager,
        'social-connect': SocialConnect,        
        'send-docs': SendDocuments,        
    },
    validations: {      
      getUser: {
        name: { required },
        address: { required },
        cnpj: { 
          CNPJValidator: (value) => {                        
            return /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(value);
          } 
        },
        phone: { 
          required, 
          phoneValidator: (value) => {
            //TODO allow mobile and other phones          
            return /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(value);
          } 
        }
      },
    },   
    methods: {
      async saveProfile() {
        try {
          this.$v.$touch();   
          if (this.$v.$invalid) { throw "Form has errors"; }

          await this.$store.dispatch('updateUserProfile', this.getUser);          
          this.$swal('Saved');        
        } catch (err) {
          // do nothing for now
        } finally {
          this.$refs.submit.disable();        
        }                           
      },
      // Need to manually touch validations when using vuex
      setName(value) {        
        this.getUser.name = value;
        this.$v.name.$touch();
      },
      setCNPJ(value) {     
        // this.getUser.cnpj = value;
                 
      },
      setPhone(value) {
        this.getUser.phone = value;
        this.$v.phone.$touch();
      }
    },
    computed: {
        ...mapGetters(['getUser', 'getProfileImgUrl'])
    }
}
</script>

<style lang="scss" scoped>
  .section {
    background: $white;
    padding: 20px;
  }

</style>