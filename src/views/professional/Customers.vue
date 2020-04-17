<template>
  <div>
      <h2 class="mb-3">Clientes que você já enviou dicas</h2>
      <customer-cards :customers="consultedCustomers" class="mb-5"></customer-cards>
      <h2 class="mb-3">Clientes interessados</h2>
      <customer-cards :customers="interestedCustomers"></customer-cards>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import CustomerCards from '@/components/customer/Cards'
export default {
    components: {
        'customer-cards': CustomerCards
    },
    methods: {
        ...mapActions('customer', ['loadCustomers'])
    },
    computed: {
        ...mapGetters('customer', ['consultedCustomers', 'interestedCustomers'])
    },
    created: function () {
        this.loadCustomers()
    }
}
</script>

<style lang="scss" scoped>
    
</style>