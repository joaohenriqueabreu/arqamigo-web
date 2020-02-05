<template>
  <nav>
    <div class="mobile-menu">
      <img src="assets/images/burger-menu.png" @click="showMenu = ! showMenu">
      <div class="menu-items-mobile" v-show="showMenu">
        <!-- <div @click="$router.push({ name: 'home' })">Home</div> -->
        <div>Prospect</div>
        <div>Alert</div>
        <div>Learn</div>
      </div>
    </div>
    <div class="search-area">
      <div class="icon">
        <!-- <router-link :to="{ name: 'home' }" v-slot="{ href, navigate }">
          <a :href="href" @click="navigate">
            <img src="assets/images/logo.png"/>
          </a>
        </router-link> -->
      </div>
      <div class="search">
        <!-- <CompanySearch></CompanySearch> -->
        <span>or</span>
        <button>New Smartlist</button>
      </div>
    </div>
    <div class="menu-items">
      <div>
        <span>Prospect</span>
        <img src="assets/images/arrow-down.png"/>
      </div>
      <div>
        <span>Alert</span>
        <img src="assets/images/arrow-down.png"/>
      </div>
      <div>
        <span>Learn</span>
        <img src="assets/images/arrow-down.png"/>
      </div>
    </div>
    <div class="profile-area">
      <!-- <Profile></Profile> -->
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      showMenu: false,
    };
  },
};
</script>

<style lang="scss" scoped>

</style>
