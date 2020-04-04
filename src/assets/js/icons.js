import Vue from 'vue';

// Font awesome imports
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserSecret, faSearch, faBars, faTimes, faHome, faMapMarkerAlt, faCoffee, faUser, faSignOutAlt, faProjectDiagram, faRuler, 
  faRulerHorizontal, faRulerVertical, faEdit, faPhone, faImages, faCamera, faVideo, faArrowCircleUp, faCheckCircle, faAngleUp, faAngleDown, faPaperPlane,
  faPaperclip, faLock, faStar, faStarHalfAlt, faArrowRight, faArrowLeft, faClipboardCheck, faTools, faListUl, faPhotoVideo,  
  faHeart,
 } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope, faStar as farStar, faComment, faQuestionCircle, faFrown } from '@fortawesome/free-regular-svg-icons';
import { faGoogle, faFacebook, faInstagram, faPinterest, faWhatsapp, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(
    faUserSecret, faSearch, faBars, faTimes, faHome, faMapMarkerAlt, faCoffee, faUser, faSignOutAlt, faProjectDiagram, 
    faRuler, faRulerHorizontal, faRulerVertical, faEnvelope, faPhone, faEdit, faCamera, faImages, faVideo, faArrowCircleUp,
    faAngleUp, faAngleDown, faPaperPlane, faPaperclip, faLock, faStar, farStar, faStarHalfAlt, faCheckCircle,
    faArrowRight, faArrowLeft, faClipboardCheck, faTools, faListUl, faInstagram, faGoogle, faLinkedin, faFacebook, faPinterest, faWhatsapp,
    faPhotoVideo, faComment, faQuestionCircle, faHeart, faFrown,
  );

Vue.component('font-awesome-icon', FontAwesomeIcon);