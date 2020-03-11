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
import SweetAlert from 'vue-sweetalert2';
import Vuelidate from 'vuelidate';
import VueCsrf from 'vue-csrf';
import VueMask from 'v-mask'

// Global components
import HoverOverlay from '@/components/layout/HoverOverlay';
import SubmitButton from'@/components/layout/SubmitButton';
import LoadingGif   from'@/components/layout/LoadingGif';

import app from '@/App.vue';

// Font awesome imports
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserSecret, faSearch, faBars, faTimes, faHome, faMapMarkerAlt, faCoffee, faUser, faSignOutAlt, faProjectDiagram, faRuler, 
  faRulerHorizontal, faRulerVertical, faEdit, faPhone, faImages, faCamera, faVideo, faArrowCircleUp, faCheckCircle, faAngleUp, faAngleDown, faPaperPlane,
  faPaperclip
 } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faGoogle, faFacebook, faInstagram, faPinterest } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import Cloudinary, { CldImage,CldTransformation,CldVideo,CldContext }  from 'cloudinary-vue';

Vue.use(Bootstrap);
Vue.use(Carousel); 
Vue.use(Modal);
Vue.use(Vuelidate);
Vue.use(VueCsrf);
Vue.use(SweetAlert);
Vue.use(VueMask);

Vue.use(Cloudinary, {
  configuration: { cloudName: 'arquiamigo' },
  components: [ CldImage,CldTransformation,CldVideo,CldContext ]
});

library.add(
  faUserSecret, faSearch, faBars, faTimes, faHome, faMapMarkerAlt, faCoffee, faUser, faSignOutAlt, faProjectDiagram, 
  faRuler, faRulerHorizontal, faRulerVertical, faEnvelope, faPhone, faEdit, faCamera, faImages, faVideo, faArrowCircleUp, faCheckCircle,
  faAngleUp, faAngleDown, faPaperPlane, faPaperclip,
  faInstagram, faGoogle, faFacebook, faPinterest
);

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('hover-overlay', HoverOverlay);
Vue.component('avatar', Avatar);
Vue.component('submit-button', SubmitButton);
Vue.component('loading-gif', LoadingGif);

// Remove warning message at console
Vue.config.productionTip = false;

Vue.prototype.$config = config;

new Vue({
  store,
  router,  
  render: h => h(app),
}).$mount('#app');
