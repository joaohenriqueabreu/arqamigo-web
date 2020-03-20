<template>
  <div>
      <div class="row">
          <div class="col-sm-4" v-for="room in allRooms" :key="room.id">
              <room-card :room="room"></room-card>
          </div>
      </div>      
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import RoomCard from '@/components/rooms/Card';
export default {
    components: {
        'room-card': RoomCard
    },
    methods: {
        ...mapActions(['loadRooms'])
    },
    computed: {
        ...mapGetters(['allRooms'])
    },
    created: function () {
        this.loadRooms();
    }
}
</script>

<style>

</style>