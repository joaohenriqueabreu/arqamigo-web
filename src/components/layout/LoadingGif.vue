<template>
  <div>
    <transition name="fade">
       <img src="~@/assets/gifs/preload.gif" alt="preload" class="fullscreen" v-if="! isApiLoaded" key="loadingGif">
       <div v-else key="content">
           <slot></slot>
       </div>        
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    computed: {
        ...mapGetters(['isApiLoaded'])
    }
}
</script>

<style lang="scss" scoped>
    img {
        position: absolute;
        top: 0;
        left: 0;        
        opacity: 0.7;
        z-index: 1030;
    }
</style>