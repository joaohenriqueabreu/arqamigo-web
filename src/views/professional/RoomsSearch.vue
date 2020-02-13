<template>
  <div>
      <rooms-cards :rooms="allRooms"></rooms-cards>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import RoomsCards from '@/components/rooms/Cards';
export default {
    components: {
        'rooms-cards': RoomsCards
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