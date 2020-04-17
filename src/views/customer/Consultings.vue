<template>
  <div>
      <h2>Minhas consultorias</h2>
      <div class="v-space-20"></div>  
      <div v-for="(consulting, index) in consultings" :key="index">
        <consulting-card :consulting="consulting"></consulting-card>
      </div>          
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import ConsultingCard from "@/components/consulting/Card"

export default {
    components: {
        'consulting-card': ConsultingCard
    },
    async created() {
        await this.loadConsultings()
    }, 
    methods: {
        ...mapActions('consulting', ['loadConsultings'])
    },
    computed: {            
        ...mapState({consultings: state => state.consulting.consultings})
    },   
}
</script>

<style>

</style>