<template>
  <div class="vertical">
      <div v-if="hasProfessional" class="vertical">
          <div>
              <div class="mb-4"></div>
              <router-link to="/customer/professionals" 
                class="p-4 rounded-pill shadow bg-pink color-white negative my-4">
                Pedir dica a este profissional
            </router-link>
          </div>
          <div class="vertical center middle">
            <avatar :src="getProfessional.photo" :size="200" :username="getProfessional.name" class="mb-3"></avatar>
            <professional-info norating :professional="getProfessional" :short="false" class="font very-large mb-5"></professional-info>
            <div class="full-width bg-pink shadow color-white bold p-4 mb-3 horizontal center middle" v-if="getProfessional.has_interacted_with_me">
                Este profissional já te enviou dicas!
            </div>
            <div class="bg-white shadow full-width p-4 mb-5 row">
                <div class="col-sm-2"></div>
                <div class="col-sm-8 horizontal justify-content-between">
                    <div class="vertical middle center">
                        <rating-stars :rating="getProfessional.rating" class="mb-2"></rating-stars>
                        <h6 class="color-light-gray">Avaliação</h6>
                    </div>
                    <div class="vertical middle center">
                        <h4>{{ getProfessional.num_consultings }}</h4>
                        <h6 class="color-light-gray">Dicas na plataforma</h6>
                    </div>
                    <div class="vertical middle center">
                        <h4>{{ getProfessional.num_consultings_for_me }}</h4>
                        <h6 class="color-light-gray">Dicas para mim</h6>
                    </div>
                    <div class="vertical middle center">
                        <h4>{{ getProfessional.active_since }}</h4>
                        <h6 class="color-light-gray">Ativo a (dias)</h6>
                    </div>
                </div>            
            </div>
            <div class="bg-white shadow row full-width p-4 mb-5">            
                <div class="col-sm-2"></div>
                <div class="col-sm-8 vertical">
                    <div class="horizontal mb-2">
                        <font-awesome-icon class="icon" :icon="['far', 'envelope']"></font-awesome-icon>
                        <h6 class="mr-3">E-mail</h6>
                        <span>{{ getProfessional.email }}</span>                    
                    </div>
                    <div class="horizontal mb-2">
                        <font-awesome-icon class="icon" icon="phone"></font-awesome-icon>
                        <h6 class="mr-3">Telefone</h6>
                        <span>{{ getProfessional.phone }}</span>                    
                    </div>
                    <div class="horizontal mb-2">
                        <font-awesome-icon class="icon" icon="map-marker-alt"></font-awesome-icon>
                        <h6 class="mr-3">Endereço</h6>                    
                        <div class="vertical">
                            <span>{{ getProfessional.address }}</span>                    
                            <span>{{ getProfessional.location }}</span>
                            <span>{{ getProfessional.zipcode }}</span>
                        </div>                    
                    </div>
                </div>
            </div>
            <div class="full-width shadow bg-white p-4 vertical middle center">
                <h1 class="mb-4">
                    <font-awesome-icon :icon="['fab','pinterest']" class="icon"></font-awesome-icon>
                    Portfólio
                </h1>
                <div class="mb-5">
                    <pinterest-board v-if="getProfessional.pinterest_board_url" :board="getProfessional.pinterest_board_url"></pinterest-board>
                    <h6 class="color-light-gray" v-else>O Professional ainda não conectou seu Portfolio</h6> 
                </div>            
                <a href="https://br.pinterest.com/search/pins/?q=reforma" target="_blank">
                    <small>Ver mais inspirações para sua reforma</small>
                </a>
            </div> 
          </div>                          
      </div>      
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ProfessionalInfo from '@/components/professional/Info';
import PinterestBoard from '@/components/social/PinterestBoard';
import RatingStars from '@/components/layout/RatingStars';
export default {
    components: {
        'professional-info': ProfessionalInfo,
        'pinterest-board': PinterestBoard,
        'rating-stars': RatingStars
    },
    mounted() {
        this.loadProfessional(this.$route.params.id);
    },
    methods: {
        ...mapActions(['loadProfessional'])
    },
    computed: {
        ...mapGetters(['hasProfessional', 'getProfessional'])
    }
}
</script>

<style>

</style>