<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
//   mounted: function () {
//     console.log(`is a customer ${this.isCustomer}`)
//     console.log(`is a pro ${this.isProfessional}`)
//     if (this.isCustomer)      { this.$router.push('/dash/customer') }
//     if (this.isProfessional)  { this.$router.push('/dash/professional') }
//     // this.$store.dispatch('logout')
//   },
//   computed: mapGetters(['isCustomer', 'isProfessional'])
}
</script>

<style>

</style>