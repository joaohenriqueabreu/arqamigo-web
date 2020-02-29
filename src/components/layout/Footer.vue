<template>  
  <div>
    <div class="d-flex justify-content-between p-5 shadow">
      <section class="left">
        <div class="main-items">
          <a v-for="(option, index) in footerOptions" :key="option.label"
            :href="baseUrl.concat(option.action)" target="_blank">
            {{ option.label }}
            <span v-if="index !== footerOptions.length - 1" class="m-1">|</span>
          </a>
        </div>
        <div>
          © Copyright {{ currentYear }}, Arqui-Amigo, a VDev Company. All rights reserved.
        </div>
      </section>
      <section class="right">
        <div class="main-items">          
          <a :href="baseUrl.concat('/terms')" target="_blank">Terms and Conditions</a>
          <span class="m-2">|</span>
          <a :href="baseUrl.concat('/privacy')" target="_blank">Privacy Policy</a>
        </div>        
      </section>
    </div>        
  </div>  
</template>

<script>
export default {
  data() {
    return {
      baseUrl: 'http://localhost:8080',
      footerOptions: [
        { action: '/about', label: 'Pricing' },
        { action: '/about', label: 'Blog' },
        { action: '/about', label: 'Webinars' },
        { action: '/about', label: 'Events' },
        { action: '/about', label: 'Help Center' },
      ],
    };
  },
  computed: {
    currentYear: () => (new Date()).getFullYear(),
  },
};
</script>

<style lang="scss" scoped>
  div {
    background-color: $white;
  }    
</style>
