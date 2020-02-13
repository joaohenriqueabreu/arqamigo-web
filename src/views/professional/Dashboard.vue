<template>
  <div>      
      <div>
        <h4>Novas solicitações recentes</h4>
        <rooms-avatars :rooms="recentRooms"></rooms-avatars>
        <div class="v-space-30"></div>
      </div>            
      <div>
        <h4>Meus Clientes</h4>
        <div class="v-space-10"></div>
        <consultings-cards :consultings="mainConsultings"></consultings-cards>
        <router-link to="/professional/consultings">Ver mais</router-link>
        <div class="v-space-30"></div>
      </div>            
      <div>
        <h4>Outros Ambientes</h4>      
        <div class="v-space-10"></div>
        <rooms-cards :rooms="otherRooms"></rooms-cards>
        <div class="v-space-30"></div>
      </div>      
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import RoomsAvatars    from "@/components/rooms/Avatars"
import RoomsCards     from '@/components/rooms/Cards'
import ConsultingsCards from '@/components/consultings/Cards'

export default {    
    name: 'professionalDash',
    components: {
        'rooms-avatars': RoomsAvatars,
        'consultings-cards': ConsultingsCards,
        'rooms-cards': RoomsCards
    },
    methods: {
      ...mapActions(['loadConsultings', 'loadRooms']),
    },
    created: async function () {
      await this.loadConsultings();
      await this.loadRooms();
    },
    computed: {            
        ...mapGetters(['mainConsultings', 'recentRooms', 'otherRooms'])
    },
}
</script>

<style lang="scss" scoped>
    div {
        z-index: 0;
    }

</style>
