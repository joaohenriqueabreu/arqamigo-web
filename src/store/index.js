import Vue      from 'vue'
import Vuex     from 'vuex'
import utils    from '@/plugins/utils';

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

const MS_IN_DAY             = 1000 * 60 * 60 * 24;
const ROOMS_DAYS_THRESHOLD  = 365;

Vue.use(Vuex);
export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
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