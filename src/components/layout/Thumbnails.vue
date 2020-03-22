<template>
  <div>
      <carousel class="full-width" :perPage="50">
        <slide v-for="(media, index) in getUploadedMedias" :key="index" class="clickable mr-2">
            <div class="horizontal position-relative">
                <font-awesome-icon icon="times" class="position-absolute clickable color-pink shadow" @click="remove(index)"></font-awesome-icon>                
                <img v-if="media.url" class="thumbnail clickable" :src="media.url" @click="maximize(index)"/>                
            </div>                                
        </slide>            
    </carousel>      
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    methods: {
        ...mapActions(['removeMedia']),
        maximize(url) {
            this.$swal(url);
        },
        remove(index) {
            this.removeMedia(index);
        }
    },
    computed: {
        ...mapGetters(['getUploadedMedias'])
    }
}
</script>

<style lang="scss" scoped>
    .thumbnail {
        height: 50px;
        width: 50px;
    }

    .position-absolute {
        top:    0;
        right:  0;
        z-index: $above;
        &:hover {
            color: $lightGray;
        }
    }
</style>