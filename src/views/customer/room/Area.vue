<template>
  <div class="vertical center middle">
    <h4 class="mb-2">Quais as medidas do seu ambiente?</h4>
    <small class="mb-5">
      Aqui vai um texto explicando que as medidas não precisam ser necessariamente exatas.
    </small>
    <div class="horizontal middle center full-width d-flex align-items-stretch">      
      <div class="group">
        <label for="height">Comprimento (cm)</label>
        <input type="text" v-model="$v.height.$model" @input="setHeight($event.target.value)">
        <div v-if="$v.height.$error">
          <div class="error" v-if="!$v.height.required">Entre com um valor válido para comprimento</div>
          <div class="error" v-if="!$v.height.numeric">Entre com um valor válido para comprimento</div>          
        </div>
        <font-awesome-icon icon="ruler-horizontal"></font-awesome-icon>
      </div>   
      <div class="horizontal center middle pl-2">
        <font-awesome-icon icon="times" class="icon"></font-awesome-icon>            
      </div>                   
      <div class="group">
        <label for="width">Largura (cm)</label>
        <input type="text" v-model="$v.width.$model" @input="setWidth($event.target.value)">
        <div v-if="$v.width.$error">
          <div class="error mt-4" v-if="!$v.width.required">Entre com um valor válido para a largura</div>
          <div class="error mt-4" v-if="!$v.width.numeric">Entre com um valor válido para a largura</div>          
        </div>
        <font-awesome-icon icon="ruler-vertical"></font-awesome-icon>        
      </div>        
    </div>
  </div>  
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { required, numeric } from 'vuelidate/lib/validators';
export default {
  data() {
    return {
      height:     null,
      width:      null,
      validArea: false
    }
  },
  validations: {
    height: { required, numeric },
    width:  { required, numeric }
  },
  methods: {
    ...mapActions(['completeStep', 'revertStep']),
    setHeight(value) { 
      this.getRoom.area.height  = value;
      this.validArea            = ! this.$v.$invalid;
      this.$v.height.$touch();
    },
    setWidth(value) { 
      this.getRoom.area.width   = value;
      this.validArea            = ! this.$v.$invalid;
      this.$v.width.$touch();
    },
  },
  computed: {
    ...mapGetters(['getRoom'])    
  },
  watch: {
    validArea: function(valid) {
      if (valid) { 
        this.completeStep({step: this.$config.AREA_STEP, proceed: false});        
      } else {
        this.revertStep(this.$config.AREA_STEP);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .group {
    @extend .bg-white;
    margin-left: 10px;
    margin-right: 10px;     
    margin-bottom: 0 !important; // Required to align x icon vertically
    width: 20vw !important;
  }
</style>