<template>
  <div>
    <profile-img :img_url="getProfileImgUrl"></profile-img>
  </div>
</template>

<script>
import MediaManager from '@/components/layout/MediaManager';
import { mapGetters } from 'vuex';

export default {
    components: {
        'profile-img': MediaManager
    },
    computed: {
        ...mapGetters(['getProfileImgUrl'])
    }
}
</script>

<style>

</style>