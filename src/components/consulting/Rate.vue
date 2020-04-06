<template>
    <!-- Always include in form so validations work -->
    <div class="vertical middle center">
        <p>Por favor, dedique um pequeno tempo para avaliar as dicas do profissional.</p>
        <div class="horizontal middle center">
            <font-awesome-icon v-for="index in getMaxRate" :key="index" 
                :icon="getIcon(index)" 
                @click="rate(index)"
                class="icon clickable">
            </font-awesome-icon>
        </div> 
        <div v-if="$v.rating.$error">
            <div class="error mt-2" v-if="! $v.rating.required || ! $v.rating.between">
                Por favor avalie o profissional
            </div>                                    
        </div>
        <div class="mb-3"></div>
        <div class="full-width">
            <input type="hidden" v-model="$v.rating.$model">
            <div class="group text-left bg-white mb-5">    
                <label for="feedback">Feedback <small class="color-light-gray bold">(opcional)</small></label>            
                <textarea v-model="$v.feedback.$model" @input="internalSetFeedback($event.target.value)" rows="3" placeholder="Como você avalia as dicas deste profissional"></textarea>
                <font-awesome-icon icon="edit" class="color-light-gray right"></font-awesome-icon>
                <div v-if="$v.feedback.$error">
                    <div class="error" v-if="! $v.feedback.required">Deixe um feedback</div>                                    
                    <div class="error" v-if="! $v.feedback.minLength">Que tal um pouco mais de detalhes?</div>                                    
                </div>
            </div>            
        </div>        
    </div>
</template>

<script>
import { required, requiredIf, between, minValue, minLength } from 'vuelidate/lib/validators'
import { mapActions, mapGetters } from 'vuex'
const MAX_RATE          = 5
const FILLED_STAR_ICON  = 'star'
const EMPTY_STAR_ICON   = ['far', 'star']
export default {
    props: {
        shouldGiveFeedback: { type: Boolean, deafult: false },
        consulting: Object        
    },
    data() {
        return {
            rating: 0,
            feedback: '',
        }
    },
    validations: {
        rating: { 
            minValue: minValue(1), 
            required: requiredIf(function () {                
                return this.shouldGiveFeedback
            }),             
        }, 
        feedback: { 
            minLength: minLength(10),
            required: requiredIf(function () {                
                return this.shouldGiveFeedback
            }) 
        }

    },
    methods: {
        ...mapActions(['rateConsulting', 'setFeedback', 'setRating']),
        getIcon(index) {            
            return index <= this.rating ? FILLED_STAR_ICON : EMPTY_STAR_ICON
        },
        rate(index) {
            this.rating             = index
            this.setRating(index)
        },
        internalSetFeedback(value) { 
            this.setFeedback(value)
            this.$v.feedback.$touch()
        },
    },
    computed: {
        ...mapGetters(['getFeedback']),
        getMaxRate() { return MAX_RATE }
    }
}
</script>

<style lang="scss" scoped>

</style>