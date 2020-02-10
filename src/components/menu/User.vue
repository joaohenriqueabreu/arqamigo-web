<template>
  <div>
    <a @click="logout" class="clickable">
      <h5>Logout</h5>
    </a>
  </div>
</template>

<script>
  export default {
    methods: {
      logout: function () {
        this.$store.dispatch('logout')        
      }
    },
  }
</script>

<style lang="scss">

</style>