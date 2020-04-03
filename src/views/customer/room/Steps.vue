<template>
  <div class="horizontal center middle p-2">
      <div class="col-sm-3">
        <span v-if="getCreateStepIndex > 0" @click.prevent="prevStep()" class="btn float-left horizontal center middle">            
            <font-awesome-icon icon="arrow-left" class="horizontal center middle"></font-awesome-icon>
        </span>                
      </div>
      <div class="col-sm-6">                        
        <div class="step-progress horizontal center middle full-width justify-content-between">
            <fade-transition group :duration="1000">
                <span v-if="! isCategoriesStepCompleted" key="incomplete">
                    <font-awesome-icon icon="list-ul"></font-awesome-icon>
                    <hr>
                </span>            
                <span v-else key="complete">
                    <font-awesome-icon icon="check-circle"></font-awesome-icon>
                    <hr class="complete">
                </span>
            </fade-transition>
            <fade-transition group :duration="1000">
                <span v-if="! isAreaStepCompleted" key="incomplete">
                    <font-awesome-icon icon="ruler"></font-awesome-icon>
                    <hr>            
                </span>
                <span v-else key="complete">
                    <font-awesome-icon icon="check-circle"></font-awesome-icon>
                    <hr class="complete">
                </span>
            </fade-transition>
            <fade-transition group :duration="1000">
                <span v-if="! isMediasStepCompleted" key="incomplete">
                    <font-awesome-icon icon="photo-video"></font-awesome-icon>
                    <hr>            
                </span>
                <span v-else key="complete">
                    <font-awesome-icon icon="check-circle"></font-awesome-icon>
                    <hr class="complete">
                </span>
            </fade-transition>
            <fade-transition group :duration="1000">
                <span v-if="! isDetailsStepCompleted" key="incomplete">
                    <font-awesome-icon icon="edit"></font-awesome-icon>
                    <hr>
                </span>
                <span v-else key="complete">
                    <font-awesome-icon icon="check-circle"></font-awesome-icon>           
                    <hr class="complete">
                </span>
            </fade-transition>
            <fade-transition group :duration="1000" class="last">
                <span v-if="! isReadyStepCompleted" class="last" key="incomplete">
                    <font-awesome-icon icon="paper-plane"></font-awesome-icon>                
                    <span></span>
                </span>
                <span v-else class="last" key="complete">
                    <font-awesome-icon icon="check-circle"></font-awesome-icon>           
                    <hr class="complete">
                </span>            
            </fade-transition>                                                                                    
        </div>                
      </div>
      <div class="col-sm-3 text-right">
        <span v-if="isCurrentStepComplete" @click.prevent="nextStep()" class="btn float-right horizontal center middle">            
            <font-awesome-icon icon="arrow-right" class="horizontal center middle"></font-awesome-icon>
        </span>        
      </div>        
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { FadeTransition } from 'vue2-transitions'
export default {
    components: {
        'fade-transition': FadeTransition
    },
    methods: {
        ...mapActions(['nextStep', 'prevStep', 'goToStep'])
    },
    computed: {
        ...mapGetters([
            'getCreateStep','getCreateStepIndex', 'isCurrentStepComplete', 
            'isMainStepCompleted', 'isCategoriesStepCompleted', 'isAreaStepCompleted', 
            'isMediasStepCompleted', 'isDetailsStepCompleted', 'isReadyStepCompleted'
        ])
    }
}
</script>

<style lang="scss" scoped>
    .position-relative {
        min-height: 10vh;
    }

    hr {  
        @extend .shadow;      
        border-top: 5px solid $white;
        width:      100%;
        margin:     -5px;
        z-index:    $below;
        &.complete {
            border-top-color: $brand;            
        }
    }

    [data-icon] {        
        @extend .clickable, .bg-white, .color-brand, .negative, .shadow;

        &[data-icon="check-circle"] {
            @extend .bg-brand, .color-white, .negative, .shadow;
        }

        width:          30px;
        height:         30px;
        padding:        5px;
        border-radius:  100px;        
        z-index:        $above;
    }

    .btn {  
        @extend .bg-white, .color-brand, .negative, .shadow;
        height: 50px;
        width:  50px;        

        [data-icon] {
            background-color:   transparent;
            box-shadow:         none;
            border-radius:      0;
            padding:            0;
            font-size:          $small;
            &:hover {
                background-color: transparent;
            }
        }     
        
        border-radius: 100px;                
    }   
    
    .step-progress {
        span {
            @extend .horizontal, .middle, .center, .full-width;

            &.last {
                max-width: 0;
            }
        }
    }
</style>