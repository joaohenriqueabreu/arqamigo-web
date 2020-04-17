<template>
  <div class="vertical middle center full-width">
      <h4 class="mb-3">Nos conte como você quer transformar esse ambiente!</h4>       
      <div class="group bg-white col-sm-8">
        <label for="height">Nome</label>
        <input type="text" v-model="$v.title.$model" @input="setTitle($event.target.value)">
        <div v-if="$v.title.$error">
          <div class="error" v-if="!$v.title.required">Dê um nome para seu ambiente</div>            
        </div>        
      </div>
      <div class="col-sm-2"></div>    
      <div class="group bg-white col-sm-8">
        <label for="height">Localização</label>
        <google-places :placeChangedCallback="setRoomLocation"></google-places>
        <!-- <input type="text" v-model="$v.title.$model" @input="setTitle($event.target.value)"> -->
        <!-- <div v-if="$v.location.$error">
          <div class="error" v-if="!$v.location.required">Por favor inclua uma localização</div>            
        </div>         -->
      </div>  
      <div class="col-sm-2"></div>    
      <!-- Need to place border radius on style to have precedence over main.scss -->
      <div class="group bg-white col-sm-8" style="border-radius: 50px !important">
        <label for="height">História</label>
        <textarea rows="10" v-model="$v.description.$model" @input="setDescription($event.target.value)"></textarea>          
        <div v-if="$v.description.$error">
          <div class="error" v-if="!$v.description.required">Nos conte um pouco mais do que quer fazer aqui!</div>            
          <div class="error" v-if="!$v.description.minLength">Nos conte um pouco mais do que quer fazer aqui!</div>  
        </div>        
      </div>      
  </div>
</template>

<script>
import { required, minLength }    from 'vuelidate/lib/validators';
import { mapGetters, mapActions, mapState } from 'vuex';
import GooglePlaces               from '@/components/layout/GooglePlaces';
export default {
  components: {
    'google-places': GooglePlaces
  },
  data() {
    return {
      title:        null,
      description:  null,
      validDetails: false
    }
  },
  validations: {
    title:       { required },
    description: { required, minLength: minLength(10) },
    // location:    { required },
  },
  methods: {
    ...mapActions('room', ['completeStep', 'revertStep', 'setRoomLocation']),
    setTitle(value) {
      this.room.title = value;
      this.validDetails  = ! this.$v.$invalid;
      this.$v.title.$touch();
    },
    setDescription(value) {    
      console.log(value.length);
      console.log(this.$v.description.$model);
      this.room.description  = value;
      this.validDetails         = ! this.$v.$invalid;
      this.$v.description.$touch();
    },
  },
  computed:{
    ...mapState({room: state => state.room.room})
  },
  watch: {
    validDetails: function(valid) {
      if (valid) { 
        this.completeStep({step: this.$config.DETAILS_STEP, proceed: false}) ;       
      } else {
        this.revertStep(this.$config.DETAILS_STEP);
      }    
    }
  }
}
</script>

<style lang="scss" style>
  .group {
    border-radius: 1rem !important;
  }
</style>