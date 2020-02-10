<template>
  <div>
      <h2>Novas solicitações recentes</h2>
      <recent-rooms></recent-rooms>
  </div>
</template>

<script>
import RecentRooms from '@/components/rooms/Recent'

export default {    
    name: 'professionalDash',
    components: {
        'recent-rooms': RecentRooms
    }
}
</script>

<style>

</style>