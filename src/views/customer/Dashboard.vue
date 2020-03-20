<template>
  <div>
      <div class="horizontal mb-5">
        <router-link class="rounded-pill bold bg-pink color-white p-3 shadow mr-3 negative" to="/customer/rooms/create">Pedir dicas de um ambiente</router-link>
        <router-link class="rounded-pill bold bg-pink color-white p-3 shadow negative" to="/customer/professionals">Conversar com um profissional</router-link>
      </div>
      <div class="vertical mb-5">
        <h4 class="mb-3">Últimas Dicas recebidas</h4>
        <consulting-card v-for="consulting in mainConsultings" :key="consulting.id" :consulting="consulting"></consulting-card>
        <router-link to="/customer/consultings">Ver mais</router-link>
      </div>
      <div>
        <h4>Meus ambientes</h4>
        <div class="row">
          <div class="col-sm-4 mb-4 d-flex align-items-stretch" v-for="room in allRooms" :key="room.id">
            <room-card :room="room"></room-card>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import ConsultingCard from "@/components/consultings/Card";
import RoomCard from "@/components/rooms/Card";
import { mapGetters, mapActions } from 'vuex';
export default {
  components: {
    'consulting-card': ConsultingCard,
    'room-card': RoomCard
  },
  async created() {
    await this.loadConsultings();    
    await this.loadRooms();
  },
  methods: {
    ...mapActions(['loadConsultings', 'loadRooms']),    
  },
  computed: {
    ...mapGetters(['allConsultings','mainConsultings', 'allRooms'])
  }
}
</script>

<style>

</style>