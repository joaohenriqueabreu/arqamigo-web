<template>
  <div>
    <div class="v-space-30"></div>
    <div class="row">
      <div class="col-sm-3"></div>
      <div class="col-sm-6 vertical center">                         
        <avatar v-if="getProfileImgUrl.length > 0" :src="getProfileImgUrl" :username="getUsername" :size="200"></avatar>         
        <div class="v-space-30"></div>
        <div class="upload rounded-pill shadow">
          <file-uploader :video="false"></file-uploader>              
        </div>        
      </div>
    </div>     
  </div>
</template>

<script>
import FileUploader from "@/components/layout/FileUploader"
import { mapGetters } from 'vuex'
export default {
    components: {
      "file-uploader": FileUploader
    },
    mounted () {
      this.$on(this.$config.IMAGE_UPLOADED, ({ url }) => {        
        this.$store.dispatch('changeProfileImage', url)
      })      
    },
    props: {
        img_url: { type: String }, 

        rounded: { type: Boolean, default: true }
    },
    computed: {
      ...mapGetters('auth', ['getProfileImgUrl', 'getUsername'])
    }
}
</script>

<style lang="scss" scoped>
  .upload {
    background: $brand;
    color: $white;
    padding: 10px;
  }
</style>