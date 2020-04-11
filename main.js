import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'

import '@/assets/styles/main.scss';

import Vue          from 'vue';
import store        from '@/store/index.js';
import router       from '@/routes/index.js';
import models       from '@/models/index.js';
import collectins   from '@/collections/index.js';
import config       from '@/assets/js/config.js';
import icons        from '@/assets/js/icons.js';
import utils        from '@/plugins/utils.js';

// UI componentes
import Bootstrap        from 'bootstrap-vue';
import Carousel         from 'vue-carousel';
import Modal            from 'vue-js-modal';
import Avatar           from 'vue-avatar';
import SweetAlert       from 'vue-sweetalert2';
import Vuelidate        from 'vuelidate';
import VueCsrf          from 'vue-csrf';
import VueMask          from 'v-mask';
import VueSmoothScroll  from 'vue2-smooth-scroll';
import PerfectScrollbar from 'vue2-perfect-scrollbar';

// Global components
import CustomModal  from '@/components/layout/CustomModal';
import HoverOverlay from '@/components/layout/HoverOverlay';
import SubmitButton from'@/components/layout/SubmitButton';
import LoadingGif   from'@/components/layout/LoadingGif';

import app from '@/App.vue';
import Cloudinary, { CldImage,CldTransformation,CldVideo,CldContext }  from 'cloudinary-vue';

Vue.use(Bootstrap);
Vue.use(Carousel); 
Vue.use(Modal, { componentName: 'v-modal' });
Vue.use(Vuelidate);
Vue.use(VueCsrf);
Vue.use(SweetAlert);
Vue.use(VueMask);
Vue.use(VueSmoothScroll);
Vue.use(PerfectScrollbar);

Vue.use(Cloudinary, {
  configuration: { cloudName: 'arquiamigo' },
  components: [ CldImage,CldTransformation,CldVideo,CldContext ]
});

Vue.component('hover-overlay', HoverOverlay);
Vue.component('modal', CustomModal);
Vue.component('avatar', Avatar);
Vue.component('submit-button', SubmitButton);
Vue.component('loading-gif', LoadingGif);

// Remove warning message at console
Vue.config.productionTip = false;

Vue.prototype.$config = config;
Vue.prototype.$utils  = utils;

new Vue({
  store,
  router,  
  render: h => h(app),
}).$mount('#app');
