<template>
  <div>
    <h4>Meus ambientes</h4>
    <div class="row">
        <div class="col-sm-4 mb-4 d-flex align-items-stretch" v-for="(room, index) in allRooms" :key="index">
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
        ...mapActions('room', ['loadRooms'])
    },
    computed: {
        ...mapGetters('room', ['allRooms'])
    }
}
</script>

<style>

</style>