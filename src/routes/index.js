import Vue              from 'vue';
import Router           from 'vue-router';

import beforeRouteRules   from './beforeRouteRules';
import homeRoutes         from './homeRoutes';
import authRoutes         from './authRoutes';
import customerRoutes     from './customerRoutes';
import professionalRoutes from './professionalRoutes';
import adminRoutes        from './adminRoutes';
import errorRoutes        from './errorRoutes';

Vue.use(Router);
let router = new Router({
    mode: 'history',
    routes: [
      ...homeRoutes,
      ...authRoutes,
      ...customerRoutes,
      ...professionalRoutes,
      ...adminRoutes,
      ...errorRoutes,
    ],
});

router.beforeEach(beforeRouteRules);
export default router;