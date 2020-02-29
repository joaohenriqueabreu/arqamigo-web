import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import '@/assets/styles/main.scss';

import Vue from 'vue';
import store from '@/store.js';
import router from '@/router.js';

// UI componentes
import Bootstrap from 'bootstrap-vue';
import Carousel from 'vue-carousel';
import Modal from 'vue-js-modal';
import Avatar from 'vue-avatar';

import HoverOverlay from '@/components/layout/HoverOverlay';

import app from '@/App.vue';

// Font awesome imports
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserSecret, faSearch, faBars, faTimes, faHome, faMapMarkerAlt, faCoffee, faUser, faSignOutAlt, faProjectDiagram, faRuler, faRulerHorizontal, faRulerVertical, faEdit, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Cloudinary from 'cloudinary-vue';
import cloudinary from 'cloudinary-core';
const cloudinaryCore = new cloudinary.Cloudinary({cloud_name: 'demo'});


Vue.use(Bootstrap);
Vue.use(Carousel); 
Vue.use(Modal);

Vue.use(Cloudinary, {
  configuration: {
    cloudName: "arquiamigo"
  }
});

library.add(
  faUserSecret, faSearch, faBars, faTimes, faHome, faMapMarkerAlt, faCoffee, faUser, faSignOutAlt, faProjectDiagram, 
  faRuler, faRulerHorizontal, faRulerVertical, faEnvelope, faPhone, faEdit, faGoogle, faFacebook
);

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('hover-overlay', HoverOverlay);
Vue.component('avatar', Avatar);

// Remove warning message at console
Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(app),
}).$mount('#app');
