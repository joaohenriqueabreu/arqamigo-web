<template>
  <div>
      <carousel class="full-width" :perPage="6" :paginationEnabled="false">
        <slide v-for="(media, index) in getUploadedMedias" :key="index" class="mr-2 mt-3">
            <div class="horizontal position-relative">                               
                <img v-if="media.url" :class="{ largeThumb: large }" class="thumbnail clickable" :src="media.url" @click="maximize(index)"/>                
                <div class="close clickable shadow" @click="remove(index)">
                    <font-awesome-icon icon="times"></font-awesome-icon>                
                </div> 
            </div>                                
        </slide>            
    </carousel>      
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    props: {
        large: { type: Boolean, default: false },        
    },
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
        &.largeThumb {
            height: 150px;
            width:  150px;
        }
    }

    .close {
        position:       absolute;
        right:          25px;
        top:            -10px;        
        opacity:        1;
        background:     $white;
        color:          $lightGray;
        padding:        5px 7px;  
        border-radius:  50px;
        font-size:      $small;        
        z-index:        $above;
        &:hover {
            background: $pink;
            color: $white;
        }
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