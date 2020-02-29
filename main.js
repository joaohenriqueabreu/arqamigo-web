import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import '@/assets/styles/main.scss';

import Vue from 'vue';
import store from '@/store.js';
import router from '@/router.js';
import config from '@/assets/js/events.js';

// UI componentes
import Bootstrap from 'bootstrap-vue';
import Carousel from 'vue-carousel';
import Modal from 'vue-js-modal';
import Avatar from 'vue-avatar';
// import Tooltip from 'v-tooltip';

import HoverOverlay from '@/components/layout/HoverOverlay';

import app from '@/App.vue';

// Font awesome imports
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserSecret, faSearch, faBars, faTimes, faHome, faMapMarkerAlt, faCoffee, faUser, faSignOutAlt, faProjectDiagram, faRuler, 
  faRulerHorizontal, faRulerVertical, faEdit, faPhone, faImages, faCamera, faVideo, faArrowCircleUp } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faGoogle, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import Cloudinary, { CldImage,CldTransformation,CldVideo,CldContext }  from 'cloudinary-vue';

Vue.use(Bootstrap);
Vue.use(Carousel); 
Vue.use(Modal);
// Vue.use(Tooltip);


Vue.use(Cloudinary, {
  configuration: { cloudName: 'arquiamigo' },
  components: [ CldImage,CldTransformation,CldVideo,CldContext ]
});

library.add(
  faUserSecret, faSearch, faBars, faTimes, faHome, faMapMarkerAlt, faCoffee, faUser, faSignOutAlt, faProjectDiagram, 
  faRuler, faRulerHorizontal, faRulerVertical, faEnvelope, faPhone, faEdit, faCamera, faImages, faVideo, faArrowCircleUp, faInstagram, faGoogle, faFacebook
);

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('hover-overlay', HoverOverlay);
Vue.component('avatar', Avatar);

// Remove warning message at console
Vue.config.productionTip = false;

Vue.prototype.$config = config;

new Vue({
  store,
  router,  
  render: h => h(app),
}).$mount('#app');
