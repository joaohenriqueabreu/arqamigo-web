<template>
  <div ref="parent">
      <button class="bg-brand color-white negative" type="submit" @click="toggleLoading()" ref="btn">
        <slot v-if="! loading"></slot>
        <roller-loader v-else color="white" :size="loaderSize"/>
      </button>
  </div>
</template>

<script>
import RollerLoader from '@bit/joshk.vue-spinners-css.roller-loader'

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
    this.loaderSize = Math.floor(this.$refs.parent.clientHeight / 2.5)    
  },
  methods: {
    toggleLoading() {
      /// This is giving an annoying behaviour of the parent having to disable the loading gif
      /// Regardless of what happens, no action should take more than 5s, so leave the toggle on for that time
      const self = this
      self.loading = true
      setTimeout(() => self.loading = false, 5000)      
    },
    disable() {
      this.loading = false
    }
  }
}
</script>

<style scoped>

</style>