<template>
  <div>
      <h2>Minhas consultorias</h2>
      <div class="v-space-20"></div>
      <consultings-cards :consultings="allConsultings"></consultings-cards>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ConsultingsCards from "@/components/consultings/Cards";

export default {
    components: {
        'consultings-cards': ConsultingsCards
    },
    methods: {
        ...mapActions(["loadConsultings"])
    },
    computed: {            
        ...mapGetters(["allConsultings"])
    },
    created: function () {
        this.loadConsultings();
    },    
}
</script>

<style>

</style>