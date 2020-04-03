<template>
  <div>
      <div class="vertical">
          <div class="row">
              <div class="col-sm-2"></div>
              <div class="col-sm-8">
                <form class="horizontal mb-5" @submit.prevent="search">
                    <div class="group text-left bg-white mr-1">            
                        <input type="text" v-model="term" name="term" placeholder="Buscar Ambientes">
                    </div>
                    <submit-button ref="submit">
                        <font-awesome-icon icon="search"></font-awesome-icon>
                    </submit-button>     
                </form>
              </div>
          </div>
        <div class="row">
            <div class="col-sm-4 d-flex align-items-stretch mb-4" v-for="room in allRooms" :key="room.id">
              <room-card :room="room"></room-card>
            </div>
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
    data() {
        return {
            term: ''
        }
    },
    methods: {
        ...mapActions(['loadRooms']),
        search() {
            this.loadRooms();
            let self = this;
            setTimeout(function () {
                self.$refs.submit.disable();
            }, 2000);
        }
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