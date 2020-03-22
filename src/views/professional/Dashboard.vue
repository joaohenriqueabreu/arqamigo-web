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
        <consulting-card v-for="consulting in mainConsultings" :key="consulting.id" :consulting="consulting"></consulting-card>
        <router-link to="/professional/consultings">Ver mais</router-link>
        <div class="v-space-30"></div>
      </div>            
      <div>
        <h4>Outros Ambientes</h4>      
        <div class="v-space-10"></div>
        <div class="row">
          <div class="col-sm-4 mb-4 d-flex align-items-stretch" v-for="room in allRooms" :key="room.id">
            <room-card :room="room"></room-card>
          </div>
        </div>        
        <div class="v-space-30"></div>
      </div>      
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import RoomsAvatars               from "@/components/rooms/Avatars"
import RoomCard                   from '@/components/rooms/Card'
import ConsultingCard             from '@/components/consulting/Card'

export default {    
    name: 'professionalDash',
    components: {
        'rooms-avatars':      RoomsAvatars,
        'consulting-card':    ConsultingCard,
        'room-card':          RoomCard
    },
    methods: {
      ...mapActions(['loadConsultings', 'loadRooms']),
    },
    created: async function () {
      await this.loadConsultings();
      await this.loadRooms();
    },
    computed: {            
        ...mapGetters(['mainConsultings', 'recentRooms', 'allRooms', 'otherRooms'])
    },
}
</script>

<style lang="scss" scoped>
    div {
        z-index: 0;
    }

</style>
