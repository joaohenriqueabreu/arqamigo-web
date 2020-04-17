<template>
  <div>
      <div class="horizontal mb-5">
        <router-link class="rounded-pill bold bg-brand color-white p-3 shadow mr-3 negative" to="/customer/rooms/create">Pedir dicas de um ambiente</router-link>
        <router-link class="rounded-pill bold bg-brand color-white p-3 shadow negative" to="/customer/professionals">Conversar com um profissional</router-link>
      </div>
      <div class="vertical mb-5">
        <h4 class="mb-3">Últimas Dicas recebidas</h4>
        <div v-for="(consulting, index) in latestConsultings" :key="index">
          <consulting-card :consulting="consulting"></consulting-card>
        </div>        
        <router-link to="/customer/consultings">Ver mais</router-link>
      </div>
      <div>
        <h4>Meus ambientes</h4>
        <div class="row">
          <div class="col-sm-4 mb-4 d-flex align-items-stretch" v-for="(room, index) in allRooms" :key="index">
            <room-card :room="room"></room-card>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ConsultingCard             from "@/components/consulting/Card"
import RoomCard                   from "@/components/rooms/Card"

export default {
  components: {
    'consulting-card':  ConsultingCard,
    'room-card':        RoomCard
  },
  created() {
    this.loadConsultings()    
    this.loadRooms()
  },
  methods: {
    ...mapActions('consulting', ['loadConsultings']),    
    ...mapActions('room', ['loadRooms'])
  },
  computed: {
    ...mapGetters('consulting', ['latestConsultings']),
    ...mapGetters('room', ['allRooms'])
  }
}
</script>

<style>

</style>