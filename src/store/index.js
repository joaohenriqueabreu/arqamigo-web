import Vue      from 'vue'
import Vuex     from 'vuex'

import AppStore             from './AppStore';
import AuthStore            from './AuthStore';
import LayoutStore          from './LayoutStore';
import MediaStore           from './MediaStore';
import RatingStore          from './RatingStore';
import LocationStore        from './LocationStore';
import CustomerStore        from './CustomerStore';
import ProfessionalStore    from './ProfessionalStore';
import RoomStore            from './RoomStore';
import ConsultingStore      from './ConsultingStore';
import CommentStore         from './CommentStore';

Vue.use(Vuex);
export default new Vuex.Store({
  // strict: process.env.NODE_ENV !== 'production',
  modules: {
    app:                AppStore,
    auth:               AuthStore,
    layout:             LayoutStore,
    rating:             RatingStore,
    media:              MediaStore,
    location:           LocationStore,
    customer:           CustomerStore,
    professional:       ProfessionalStore,
    consulting:         ConsultingStore,
    room:               RoomStore,
    comment:            CommentStore,
  }
});