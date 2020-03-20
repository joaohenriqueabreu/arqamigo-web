<template>
  <div ref="parent">
      <button class="bg-pink color-white negative" type="submit" @click="loading = true" ref="btn">
        <slot v-if="! loading"></slot>
        <roller-loader v-else color="white" :size="loaderSize"/>
      </button>
  </div>
</template>

<script>
import RollerLoader from '@bit/joshk.vue-spinners-css.roller-loader';

export default {
  components: {
    'roller-loader': RollerLoader
  },
  data() {
    return {
      loading: false,
      size: 0
    }
  },  
  mounted () {
    this.loaderSize = Math.floor(this.$refs.parent.clientHeight / 2.5);    
  },
  methods: {
    disable() {
      this.loading = false;
    }
  }
}
</script>

<style scoped>

</style>