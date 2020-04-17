<template>
  <div>
      <h4>Conecte suas redes sociais</h4>
      <div class="v-space-20"></div>
      <div class="row">
          <div class="col-sm-2"></div>
          <div class="col-sm-8 text-justify">
              <small>Encorajamos os profissionais a conectarem suas contas do Pinterest uma vez que essa rede social será disponibilizada como seu portifolio para os clientes.</small>
          </div>
      </div>
      <div class="v-space-20"></div>
      <div class="row">
        <div class="col-sm-2"></div>
        <div class="col-sm-8 text-center horizontal center">   
            <transition name="slide-fade" mode="in-out">
                <div v-if="! hasPinterestBoard" key="connecting">                
                    <font-awesome-icon v-if="! isConnectedToPinterest" class="social clickable" :icon="['fab', 'pinterest']" size="2x" @click="pinterestLogin"></font-awesome-icon>
                    <div v-else>
                        <p>
                            <small>
                                Cole aqui a url do quadro do seu portfolio (ex.: <a class="sampleBoard" href="https://www.pinterest.com/arquiamigos/portfolio">https://www.pinterest.com/arquiamigos/portfolio</a>)
                            </small>
                        </p>
                        <form v-on:submit.prevent="updatePinterestBoardUrl" class="d-flex align-items-stretch">
                            <div class="group">
                                <input type="text" v-model="$v.pinterestBoardUrl.$model">
                                <div v-if="$v.pinterestBoardUrl.$error">
                                    <div class="error" v-if="! $v.pinterestBoardUrl.required && ! $v.pinterestBoardUrl.url">Entre com uma URL válida (ex.:https://www.arquiamigos.com.br/...)</div>                                    
                                </div>
                            </div>                                                
                            <div class="h-space-10"></div>
                            <submit-button>Enviar</submit-button>
                        </form>                    
                    </div>                                
                </div>
                <div v-else class="rounded-pill connected-pinterest horizontal middle" key="connected">
                    <font-awesome-icon class="social connected float-left" :icon="['fab', 'pinterest']" size="2x" v-b-tooltip.hover title="Connected"></font-awesome-icon>
                    <div class="h-space-10"></div>
                    <div class="horizontal center full-width">Connected</div>                    
                </div>
            </transition>
        </div>
      </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { required, url } from 'vuelidate/lib/validators'

let PDK = window.PDK

export default {
    mounted () {
        if (PDK !== undefined) {
            PDK.init({ appId: '5028546460684165999'})
        }        
    },
    data() {
        return {
            pinterestBoardUrl: ''
        }        
    },
    validations: {
        pinterestBoardUrl: {
            required,
            url
        }
    },
    methods: {        
        pinterestLogin: function () {   
            if (this.isConnectedToPinterest) { return }
            PDK.login({ scope: 'read_public'}, this.pinterestSuccess)
        },
        pinterestSuccess: function (result) {
            console.log(result)
            if (result.session.accessToken) {                              
                this.$store.dispatch('setPinterestToken', result.session.accessToken)                                
            }
        },
        updatePinterestBoardUrl: function () {            
            try {
                this.$v.$touch()     
                if (this.$v.$invalid) { throw "Form contain errors" }
                this.$store.dispatch('setPinterestBoard', this.pinterestBoardUrl)                
            } catch (err) { 
             // do nothing for now
            }                              
        }
    },
    computed: {
        ...mapGetters('professional', ['isConnectedToPinterest', 'hasPinterestBoard', 'getPinterestBoard']),
        hasBoard: function () {
            return this.$$nextTick(this.hasPinterestBoard)
        }
    }
}
</script>

<style lang="scss" scoped>
    .social {        
        color: $lightGray;
        &:hover {
            @extend .transition-ease;
            color: $brand;
        }   
        
        &.connected {
            color: $white;
        }
    }

    .sampleBoard {
        text-transform: lowercase;
    }

    .group {
        // Overwrite main.scss as it is making btn weird
        margin-bottom: 0px;
    }

    .connected-pinterest {
        background: $brand;
        color: $white;
        min-width: 12vw;
        padding: 10px;
        font-weight: $bold;
    }
</style>