<template>
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
            <div class="error" v-if="! $v.rating.required || ! $v.rating.between">
                Por favor avalie o profissional
            </div>                                    
        </div>
        <div class="mb-3"></div>
         <form @submit.prevent="update" class="full-width">
            <input type="hidden" v-model="$v.rating.$model">
            <div class="group text-left bg-white mb-5">    
                <label for="feedback">Feedback <small class="color-light-gray bold">(opcional)</small></label>            
                <textarea v-model="$v.feedback.$model" @input="setFeedback($event.target.value)" rows="3" placeholder="Como você avalia as dicas deste profissional"></textarea>
                <font-awesome-icon icon="edit" class="color-light-gray right"></font-awesome-icon>
                <div v-if="$v.feedback.$error">
                    <div class="error" v-if="! $v.feedback.required">Por favor avalie o profissional</div>                                    
                </div>
            </div>            
         </form>        
    </div>
</template>

<script>
import { required, requiredIf, between } from 'vuelidate/lib/validators';
import { mapActions, mapGetters } from 'vuex';
const MAX_RATE          = 5;
const FILLED_STAR_ICON  = 'star';
const EMPTY_STAR_ICON   = ['far', 'star'];
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
            required, 
            between: between(1, MAX_RATE) 
        }, 
        feedback: { required: requiredIf(function () {
            console.log("are we checking this?");
            return this.shouldGiveFeedback;
        }) }

    },
    methods: {
        ...mapActions(['rateConsulting', 'setFeedback', 'setRating']),
        getIcon(index) {            
            return index <= this.rating ? FILLED_STAR_ICON : EMPTY_STAR_ICON;
        },
        rate(index) {
            this.rating             = index;
            this.setRating(index);
        },
        setFeedback(value) { 
            this.setFeedback(value);
            this.$v.feedback.$touch();
        },
    },
    computed: {
        ...mapGetters(['getFeedback']),
        getMaxRate() { return MAX_RATE; }
    }
}
</script>

<style lang="scss" scoped>
    // p {
    //     font-size: inherit;
    // }
</style>