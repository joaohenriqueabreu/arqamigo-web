import Vue from 'vue';

// Font awesome imports
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserSecret, faSearch, faBars, faTimes, faHome, faMapMarkerAlt, faCoffee, faUser, faSignOutAlt, faProjectDiagram, faRuler, 
  faRulerHorizontal, faRulerVertical, faEdit, faPhone, faImages, faCamera, faVideo, faArrowCircleUp, faCheckCircle, faAngleUp, faAngleDown, faPaperPlane,
  faPaperclip, faLock, faStar, faStarHalfAlt
 } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope, faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { faGoogle, faFacebook, faInstagram, faPinterest, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(
    faUserSecret, faSearch, faBars, faTimes, faHome, faMapMarkerAlt, faCoffee, faUser, faSignOutAlt, faProjectDiagram, 
    faRuler, faRulerHorizontal, faRulerVertical, faEnvelope, faPhone, faEdit, faCamera, faImages, faVideo, faArrowCircleUp, faCheckCircle,
    faAngleUp, faAngleDown, faPaperPlane, faPaperclip, faLock, faStar, farStar, faStarHalfAlt, faCheckCircle,
    faInstagram, faGoogle, faFacebook, faPinterest, faWhatsapp
  );

Vue.component('font-awesome-icon', FontAwesomeIcon);