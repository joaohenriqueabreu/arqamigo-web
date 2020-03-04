<template>
  <div ref="parent">
      <button type="submit" @click="loading = true" ref="btn">
        <slot v-if="!loading"></slot>
        <roller-loader v-else color="white" :size="size"/>
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
    this.size = Math.floor(this.$refs.parent.clientHeight / 2.5);    
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