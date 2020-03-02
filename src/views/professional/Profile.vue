<template>
  <div>
    <profile-img :img_url="getProfileImgUrl"></profile-img>
    <div class="v-space-50"></div> 
    <div class="shadow section text-center">
      <social-connect></social-connect>
      <div class="v-space-20"></div>
      <portfolio-display></portfolio-display>    
    </div>   
    <div class="v-space-50"></div>
    <div class="shadow section text-center">
      <send-docs></send-docs>
    </div>
  </div>
</template>

<script>
import MediaManager from '@/components/layout/MediaManager';
import SocialConnect from '@/components/professional/SocialConnect';
import PortfolioDisplay from '@/components/professional/PortfolioDisplay';
import SendDocuments from '@/components/professional/SendDocuments';
import { mapGetters } from 'vuex';

export default {
    components: {
        'profile-img': MediaManager,
        'social-connect': SocialConnect,
        'portfolio-display': PortfolioDisplay,
        'send-docs': SendDocuments,        
    },
    computed: {
        ...mapGetters(['getProfileImgUrl'])
    }
}
</script>

<style lang="scss" scoped>
  .section {
    background: $white;
    padding: 20px;
  }

</style>