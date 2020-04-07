<template>
  <div class="vertical">
    <div class="row mb-5">
      <div class="col-sm-2"></div>
      <div class="col-sm-8">
        <form class="vertical" @submit.prevent="search">          
          <div class="horizontal d-flex justify-content-between">
            <div class="group text-left bg-white mr-1">            
              <input type="text" v-model="term" name="term" placeholder="Buscar profissionais">
            </div>
            <div class="group text-left bg-white mr-1">            
              <google-places></google-places>
            </div>
            <submit-button>
              <font-awesome-icon icon="search"></font-awesome-icon>
            </submit-button>     
          </div>
          <!-- TODO later include more filters to allow customer to find professionals -->
          <div class="horizontal middle center" v-if="!hideExtraFilters">
            <transition name="fade">
              <div key="hidingFilters" v-if="hideExtraFilters">
                <span class="bold clickable" @click="hideExtraFilters = false">
                  <small>Mais Opções <font-awesome-icon icon="angle-down"></font-awesome-icon></small>
                </span>
              </div>
              <div key="showingFilters" v-else class="vertical">
                <span class="bold clickable" @click="hideExtraFilters = true">
                  <small>Esconder <font-awesome-icon icon="angle-up"></font-awesome-icon></small>
                </span>
                <div class="horizontal">
                  <div class="group text-left bg-white mr-1">            
                    <input type="text" v-model="term" name="term" placeholder="Buscar profissionais">
                  </div>
                  <div>
                    <font-awesome-icon v-for="index in 5" :key="index" 
                      :icon="getIcon(index)" 
                      @click="filterByRate(index)"
                      class="icon clickable">
                    </font-awesome-icon>
                  </div>
                </div>                
              </div>                            
            </transition>
          </div>
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
import { mapActions, mapGetters } from 'vuex'
import ProfessionalInfo           from '@/components/professional/Info'
import GooglePlaces               from '@/components/layout/GooglePlaces'
export default {
  components: {
    'professional-info': ProfessionalInfo,
    'google-places':     GooglePlaces
  },
  data() {
    return {
      term:             '',
      hideExtraFilters: true
    }
  },
  methods: {
    ...mapActions(['searchProfessionals']),
    async search() {      
      await this.searchProfessionals(this.term)
    }
  },
  computed: {
    ...mapGetters(['hasProfessionals', 'allProfessionals'])
  }
}
</script>

<style lang="scss" scoped>

</style>