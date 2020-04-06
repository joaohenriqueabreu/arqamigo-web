<template>
  <div>
    <h4>Meus ambientes</h4>
    <div class="row">
        <div class="col-sm-4 mb-4 d-flex align-items-stretch" v-for="room in allRooms" :key="room.id">
            <room-card :room="room"></room-card>
        </div>
    </div>
  </div>
</template>

<script>
import RoomCard from "@/components/rooms/Card"
import { mapGetters, mapActions } from 'vuex'
export default {
    components: {
        'room-card': RoomCard
    },
    async created() {    
        await this.loadRooms()
    },
    methods: {
        ...mapActions(['loadRooms'])
    },
    computed: {
        ...mapGetters(['allRooms'])
    }
}
</script>

<style>

</style>