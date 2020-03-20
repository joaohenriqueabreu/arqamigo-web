<template>
  <div class="vertical">
    <div class="row mb-5">
      <div class="col-sm-2"></div>
      <div class="col-sm-8">
        <form class="horizontal" @submit.prevent="search">
          <div class="group text-left bg-white mr-1">            
            <input type="text" v-model="term" name="term" placeholder="Buscar profissionais">
          </div>
          <submit-button ref="submit">
            <font-awesome-icon icon="search"></font-awesome-icon>
          </submit-button>     
        </form>
      </div>
    </div>
    <div class="row" v-if="hasProfessionals">
      <div class="col-sm-4 mb-4 d-flex align-content-stretch" v-for="professional in allProfessionals" :key="professional.id">
        <div class="card full-width shadow full-height">
          <div class="card-body horizontal">
            <router-link :to="`/customer/professionals/${professional.id}`">
              <hover-overlay :rounded="true" icon="coffee" class="mr-3">
                <avatar :src="professional.photo" :username="professional.name"></avatar>
              </hover-overlay>
            </router-link>
            
            <div class="vertical">
              <professional-info :professional="professional" class="mb-2"></professional-info>
              <div class="horizontal color-light-gray">
                <font-awesome-icon icon="map-marker-alt" class="mr-2"></font-awesome-icon>  
                <small class="bold">{{ professional.location }}</small>
              </div>
            </div>            
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <h6>Nenhum profissional encontrado</h6>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ProfessionalInfo from '@/components/professional/Info';
export default {
  components: {
    'professional-info': ProfessionalInfo
  },
  data() {
    return {
      term: ''
    }
  },
  methods: {
    ...mapActions(['searchProfessionals']),
    async search() {      
      await this.searchProfessionals(this.term);
      this.$refs.submit.disable();
    }
  },
  computed: {
    ...mapGetters(['hasProfessionals', 'allProfessionals'])
  }
}
</script>

<style>

</style>