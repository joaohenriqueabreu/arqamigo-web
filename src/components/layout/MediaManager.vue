<template>
  <div>
    <div class="v-space-30"></div>
    <div class="row">
      <div class="col-sm-3"></div>
      <div class="col-sm-6 horizontal center">
        <hover-overlay :rounded="true" icon="edit">                  
          <avatar v-if="img_url.length > 0" :src="img_url" :username="img_url" :size="200"></avatar> 
        </hover-overlay>
        <file-uploader></file-uploader>              
      </div>
    </div>     
  </div>
</template>

<script>
import FileUploader from "@/components/layout/FileUploader";
export default {
    components: {
      "file-uploader": FileUploader
    },
    props: {
        img_url: { type: String }, 

        rounded: { type: Boolean, default: true }
    }
}
</script>

<style>

</style>