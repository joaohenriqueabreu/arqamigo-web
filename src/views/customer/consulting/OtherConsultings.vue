<template>
  <perfect-scrollbar>
    <h6 class="p-2 color-brand bold">Outras dicas recebidas</h6>                
    <div class="mb-3"></div>
    <div v-for="(consulting, index) in otherConsultings" :key="index" class="consulting-pill">
      <div class="horizontal justify-content-between middle my-3 mx-1" @click="reloadConsulting(consulting.id)">
          <div class="horizontal middle single-line">
          <avatar :src="consulting.professional.photo" :username="consulting.professional.name" class="mr-2"></avatar>
          <span>{{ consulting.professional.name }}</span>
          </div>
          <div class="rounded-circle shadow px-3 py-2 mr-2 color-brand bold bg-white negative">
          <span>{{ consulting.num_comments }}</span>                                          
          </div>                    
      </div>                                    
      <hr class="m-0" />
    </div>                                               
  </perfect-scrollbar>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
  props: {
    room: Object
  },
  data() {
    return {
      lastConsultingIdLoaded: 0,
    }
  },
  created() {
    this.loadRoomConsultings(this.room.id);
    this.lastConsultingIdLoaded = this.consulting.id;
  },
  methods: {
    ...mapActions('consulting', ['loadConsulting']),
    ...mapActions('room', ['loadRoomConsultings']),
    reloadConsulting(id) {      
      // no need to reload own consulting (should not happen!!)
      if (id === this.lastConsultingIdLoaded) { return; }
      
      this.lastConsultingIdLoaded = id;

      // update url
      this.$router.push({name: this.$route.name, params: { id }})

      // load new consulting
      this.loadConsulting(id);
    }
  },
  computed: {
    ...mapState({ consulting: state => state.consulting.consulting }),
    ...mapGetters('consulting', ['otherConsultings']),    
  }
}
</script>

<style lang="scss" scoped>
.consulting-pill {
    @extend .vertical, .clickable, .bold;
    color: $gray !important;
    &:hover {
      @extend .transition-ease, .shadow;
      background: $lightPink;
      color:      $white !important;
    }
  }
</style>