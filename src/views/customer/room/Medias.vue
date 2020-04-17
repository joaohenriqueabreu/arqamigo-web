<template>
  <div class="vertical middle center">
      <h4 class="mb-2">Agora, inclua fotos e videos do seu ambiente</h4>
      <small class="mb-5">Isso ajudará os profissionais a entenderem as particularidades e entregar melhores sugestões</small>
      <div>
          <thumbnails large class="mb-4"></thumbnails>          
      </div>
      <div class="horizontal middle center rounded-pill bg-brand color-white negative p-4 mb-1">
        <file-uploader></file-uploader>
      </div>          
      <small class="color-light-gray">* Tamanho máximo de arquivo 2mb</small>
  </div>
</template>

<script>
import FileUploader from '@/components/layout/FileUploader'
import Thumbnails   from '@/components/layout/Thumbnails'
import { mapActions, mapGetters } from 'vuex'
export default {
    components: {
        'file-uploader':    FileUploader,
        'thumbnails':       Thumbnails  
    },
    mounted() {
        this.completeStep({ step: this.$config.MEDIAS_STEP, proceed: false})
    },
    data() {
        return {
            hasMedias: false
        }
    },
    methods: {
        ...mapActions('room', ['completeStep', 'revertStep'])
    },
    computed: {
        ...mapGetters('media', ['hasUploadedMedias']),
    },
    watch: {
        hasUploadedMedias: function (hasMedias) {
            if (hasMedias) {
                this.completeStep({ step: this.$config.MEDIAS_STEP, proceed: false})
            } else {
                this.revertStep(this.$config.MEDIAS_STEP)
            }
        }
    }
}
</script>

<style>

</style>