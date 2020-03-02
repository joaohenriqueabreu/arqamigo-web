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
        <div class="col-sm-4"></div>
        <div class="col-sm-4 text-center horizontal center">            
            <!-- <font-awesome-icon class="social clickable" v-bind:class="{ connected: hasInstagram }" :icon="['fab', 'instagram']" size="2x"></font-awesome-icon> -->
            <!-- <div class="h-space-20"></div> -->
            <font-awesome-icon class="social clickable" v-bind:class="{ connected: hasPinterest }" :icon="['fab', 'pinterest']" size="2x" @click="pinterestLogin"></font-awesome-icon>
        </div>
      </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

let PDK = window.PDK;

export default {
    mounted () {
        PDK.init({ appId: '5028546460684165999'});
    },
    methods: {
        pinterestLogin: function () {   
            if (this.hasPinterest) { return; }
            PDK.login({ scope: 'read_public'}, this.pinterestSuccess);
        },
        pinterestSuccess: function (result) {
            if (result.session.accessToken) {                              
                this.$store.dispatch('setPinterestToken', result.session.accessToken);                
            }
        },
    },
    computed: {
        ...mapGetters(['hasPinterest'])
    }
}
</script>

<style lang="scss" scoped>
    .social {        
        color: $lightGray;
        &:hover {
            @extend .transition-ease;
            color: $pink;
        }

        &.connected {
            color: $pink;
        }
    }
</style>