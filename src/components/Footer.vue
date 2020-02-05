<template>
  <div>
    <footer>
      <section class="left">
        <div class="main-items">
          <a v-for="(option, index) in footerOptions" :key="option.label"
            :href="baseUrl.concat(option.action)" target="_blank">
            {{ option.label }}
            <span v-if="index !== footerOptions.length - 1">|</span>
          </a>
        </div>
        <div>
          © Copyright {{ currentYear }}, Intricately, Inc. All rights reserved.
        </div>
      </section>
      <section class="right">
        <div class="main-items">
          <a :href="baseUrl.concat('/terms')" target="_blank">Terms and Conditions</a>
          <span>|</span>
          <a :href="baseUrl.concat('/privacy')" target="_blank">Privacy Policy</a>
        </div>
        <div>
          <a href="#"><img src="assets/images/linkedin.png"/></a>
          <a href="#"><img src="assets/images/facebook.png"/></a>
          <a href="#"><img src="assets/images/twitter.png"/></a>
        </div>
      </section>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      baseUrl: 'https://www.intrincately.com',
      footerOptions: [
        { action: '/demo', label: 'Pricing' },
        { action: '/blog', label: 'Blog' },
        { action: '/blog', label: 'Webinars' },
        { action: '/blog', label: 'Events' },
        { action: '/how-it-works', label: 'Help Center' },
      ],
    };
  },
  computed: {
    currentYear: () => (new Date()).getFullYear(),
  },
};
</script>

<style lang="scss" scoped>
  footer {
    @extend %bg-light-grey, %color-mid-grey, %full-width, %padding-top-20, %padding-bottom-20;

    display:            flex;
    flex-direction:     row;

    section {
      font-size:        0.7em;
      width:            50vw;

      div {
        @extend %padding-bottom-10;
      }

      a {
        @extend %color-mid-grey;
      }

      img {
        @extend %padding-right-10;
      }

      span {
        @extend %padding-horizontal-10
      }

      .main-items {
        a {
          @extend %color-dark-grey;
        }
      }

      &.left {
        @extend %column;
        align-items:  flex-start;
        padding-left: 10vw;
      }
      &.right {
        @extend %column;
        align-items:    flex-end;
        padding-right:  10vw;
      }
    }
  }
</style>
