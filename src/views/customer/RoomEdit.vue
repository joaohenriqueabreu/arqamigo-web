<template>
  <div class="vertical"> 
    <div v-if="hasRoom">
      <form @submit.prevent="save" class="mb-4">
        <h4 class="my-3">Atualizar ambiente</h4>
        <div class="group text-left bg-white mb-5">
          <label for="title">Título</label>
          <input type="title" v-model="room.title" name="title">
          <font-awesome-icon icon="edit" class="color-light-gray right"></font-awesome-icon>
        </div>
        <h4 class="mb-0">Medias</h4>
        <thumbnails large class="mb-4"></thumbnails>
        <hr>
        <div class="horizontal center middle">
          <div class="col-sm-5"></div>
          <div class="col-sm-2">
            <div class="bg-brand shadow rounded-pill color-white p-3 negative">
              <file-uploader></file-uploader>
            </div>      
          </div>
          <div class="col-sm-5"></div>
        </div>        
        <hr class="mb-5">
        <div class="mb-3 bg-white shadow full-width p-4">
          <h4 class="mb-3">Detalhes do ambiente</h4>
          <div class="group text-left bg-white mb-3">
            <label for="description">Descrição</label>
            <textarea rows="3" v-model="room.description" name="description"></textarea>            
          </div>
          <div class="group text-left bg-white mb-3">
            <label for="location">Local</label>
            <input type="location" v-model="room.location" name="location">
            <font-awesome-icon icon="map-marker-alt" class="color-light-gray right"></font-awesome-icon>
          </div>
          <h4 class="mt-4 mb-2">Medidas</h4>            
          <div class="horizontal">            
            <div class="col-sm-2"></div>
            <div class="col-sm-8 horizontal center">
              <div class="col-sm-5">
                <div class="group text-left bg-white mb-3">
                  <label for="length">Comprimento (m)</label>
                  <input type="text" v-model="room.area.height" name="length">
                  <font-awesome-icon icon="ruler-horizontal" class="color-light-gray right"></font-awesome-icon>
                </div>
              </div>
              <div class="col-sm-1 horizontal middle center">
                <font-awesome-icon icon="times" class="icon"></font-awesome-icon>
              </div>
              <div class="col-sm-5">
                <div class="group text-left bg-white mb-3">
                  <label for="width">Largura (m)</label>
                  <input type="text" v-model="room.area.width" name="width">
                  <font-awesome-icon icon="ruler-vertical" class="color-light-gray right"></font-awesome-icon>
                </div>
              </div>
            </div>                        
          </div>          
        </div>
        <div class="horizontal center middle mt-3">
          <submit-button>Atualizar</submit-button>
        </div>        
      </form>
      <h4 class="mb-4">Últimas dicas recebidas deste ambiente</h4> 
      <div v-for="(consulting, index) in latestConsultings" :key="index">
        <consulting-card noTitle :consulting="consulting"></consulting-card>
      </div>      
    </div>                
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import Thumbnails from '@/components/layout/Thumbnails'
import FileUploader from '@/components/layout/FileUploader'
import ConsultingCard from '@/components/consulting/Card'

export default {
  async created() {
    await this.loadRoom(this.$route.params.id);    
  },
  components: {
    'thumbnails':       Thumbnails,
    'file-uploader':    FileUploader,
    'consulting-card':  ConsultingCard
  },
  methods: {
    ...mapActions('room', ['loadRoom', 'saveRoom'])  ,
    async save() {
      await this.saveRoom();
      this.$router.push({name: 'customer.dashboard'});
    }  
  },
  computed: {
    ...mapState({ room: state => state.room.room }),
    ...mapGetters('room', ['hasRoom']),
    ...mapGetters('consulting', ['latestConsultings'])
  }
}
</script>

<style>

</style>