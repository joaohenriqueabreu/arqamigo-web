<template>
  <div>
      <h2>Minhas consultorias</h2>
      <div class="v-space-20"></div>      
      <consulting-card v-for="consulting in allConsultings" :key="consulting.id" :consulting="consulting"></consulting-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ConsultingCard from "@/components/consulting/Card"

export default {
    components: {
        'consulting-card': ConsultingCard
    },
    methods: {
        ...mapActions(["loadConsultings"])
    },
    computed: {            
        ...mapGetters(["allConsultings"])
    },
    created: function () {
        this.loadConsultings()
    },    
}
</script>

<style>

</style>