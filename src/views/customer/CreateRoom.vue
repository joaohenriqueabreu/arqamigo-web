<template>
  <div>    
    <form class="vertical position-relative" @submit.prevent="submit()">        
      <slide-transition group mode="out-in" :duration="1000">
        <div class="step vertical center middle pt-0" :key="$config.MAIN_STEP" v-show="showMainStep">          
          <main-step></main-step>                           
        </div>            
        <div class="step horizontal center middle pt-0" :key="$config.CATEGORIES_STEP" v-show="showCategoriesStep">
          <categories-step></categories-step>        
        </div>       
        <div class="step horizontal center middle pt-0" :key="$config.AREA_STEP" v-show="showAreaStep">
          <area-step></area-step>
        </div>   
        <div class="step horizontal center middle pt-0" :key="$config.MEDIAS_STEP" v-show="showMediasStep">
          <medias-step></medias-step>
        </div>             
        <div class="step horizontal center middle pt-0" :key="$config.DETAILS_STEP" v-show="showDetailsStep">
          <details-step></details-step>           
        </div>              
        <div class="step vertical center middle pt-0" :key="$config.READY_STEP" v-show="showReadyStep">
            <h4 class="mb-4">Tudo pronto!</h4>          
            <submit-button>Criar</submit-button>                              
        </div>              
      </slide-transition>
      <div class="position-fixed full-width">        
        <create-steps></create-steps>
      </div>      
    </form>    
  </div>
</template>

<script>
import MainStep                   from '@/views/customer/room/Main'
import CategoriesStep             from '@/views/customer/room/Categories'
import AreaStep                   from '@/views/customer/room/Area'
import MediasStep                 from '@/views/customer/room/Medias'
import DetailsStep                from '@/views/customer/room/Details'
import CreateSteps                from '@/views/customer/room/Steps'
import { SlideYUpTransition }     from 'vue2-transitions'
import { mapGetters, mapActions } from 'vuex'

export default {  
  created() {
    this.newRoom()
  },
  components: {
    'main-step':          MainStep,
    'categories-step':    CategoriesStep,
    'area-step':          AreaStep,
    'medias-step':        MediasStep,
    'details-step':       DetailsStep,
    'create-steps':       CreateSteps,
    'slide-transition':   SlideYUpTransition 
  },       
  methods: {
    ...mapActions(['newRoom', 'createRoom', 'nextStep', 'prevStep']),
    showStep(id) {            
      return this.getCreateStep === id
    },
    submit() {
      if (this.isCategoriesStepCompleted && this.isAreaStepCompleted && this.isDetailsStepCompleted) {
        this.createRoom()
      }
    }
  },
  computed: {
    ...mapGetters(['getCreateStep', 'getCreateStepIndex', 'isCategoriesStepCompleted', 'isAreaStepCompleted', 'isDetailsStepCompleted']),    
    showMainStep()        { return this.getCreateStep === this.$config.MAIN_STEP },    
    showCategoriesStep()  { return this.getCreateStep === this.$config.CATEGORIES_STEP },
    showAreaStep()        { return this.getCreateStep === this.$config.AREA_STEP },
    showMediasStep()      { return this.getCreateStep === this.$config.MEDIAS_STEP },
    showDetailsStep()     { return this.getCreateStep === this.$config.DETAILS_STEP },
    showReadyStep()       { return this.getCreateStep === this.$config.READY_STEP },
  }
}
</script>

<style lang="scss" scoped>
  .position-fixed {    
    background: transparentize($lightPink, 0.7);
    color:      $white;
    bottom:     0;
    left:       0;
    width:      100%;
  }

  .step {
    position: relative;
    padding-top: 20vh;
    width: 100%;
    .bottom {
      position: absolute;
      bottom: 50px;
    }           
  }  
</style>