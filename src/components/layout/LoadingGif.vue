<template>
  <div>
    <transition name="fade">
       <img src="~@/assets/gifs/preload.gif" alt="preload" v-if="! isApiLoaded" key="loadingGif">
       <div v-else key="content">
           <slot></slot>
       </div>        
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters('app', ['isApiLoaded'])
    }
}
</script>

<style lang="scss" scoped>
    img {
        @extend .full-width, .full-height;
        position:   absolute;
        top:        0;
        left:       0 ;       
        opacity:    0.7;
        z-index:    $above;
    }
</style>