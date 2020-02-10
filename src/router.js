import Vue          from 'vue';
import Router       from 'vue-router';
import store        from '@/store';

import Home         from '@/views/info/Home';
import About        from '@/views/info/About';
import Login        from '@/views/auth/Login';
import Register     from '@/views/auth/Register';

import Admin        from '@/views/admin/Admin';

import Dash             from '@/views/dashboard/Dash';
import AdminDash        from '@/views/admin/Dashboard';
import CustomerDash     from '@/views/dashboard/Customer';
import ProfessionalDash from '@/views/dashboard/Professional';
import Unauthorized     from '@/views/error/404';

Vue.use(Router);

const authMiddleware = {
    meta: { 
        requiresAuth: true
    }
};

const preventAuthMiddleware = {
  meta: {
    redirectWhenAuth: true
  }
}

const customerMiddleware = {
  meta: {
    requiresCustomerAuth: true
  }
};

const professionalMiddleware = {
  meta: {
    requiresProfessionalAuth: true
  }
};

const adminMiddleware = {
  meta: {
    requiresAdminAuth: true
  }
};

let router = new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        name: 'home',
        component: Home,
        ...preventAuthMiddleware
      },
      {
        path: '/about',
        name: 'about',
        component: About
      },
      {
        path: '/login',
        name: 'login',
        component: Login,
        ...preventAuthMiddleware
      },
      {
        path: '/register',
        name: 'register',
        component: Register
      },
      {
        path: '/dash',
        name: 'dash',
        component: Dash,
        ...authMiddleware,        
        children: [
          {
            path: 'customer',
            name: 'customer.dash',
            component: CustomerDash,
            ...customerMiddleware
          },
          {
            path: 'professional',
            name: 'professional.dash',
            component: ProfessionalDash,
            ...professionalMiddleware
          },      
        ]
      },
      {
        path: '/admin',
        name: 'admin',
        component: Admin,
        ...authMiddleware,
        ...adminMiddleware,
        children: [
          {
            path: 'dash',
            name: 'admin.dash',
            component: AdminDash
          }
        ]
      },
      {
        path: '/404',
        name: 'unauthorized',
        component: Unauthorized
      },
      {
        path: '*',
        name: 'undefined',
        component: Unauthorized
      },
    ]
});

router.beforeEach((to, from, next) => {
    console.log(to.path)
    if (to.matched.some(page => page.meta.requiresAuth)) {      
      console.log(`requires login ${store.getters.isLoggedIn}`)
      if (! store.getters.isLoggedIn) {
        next('/404')
        return
      }
      
      if (to.path === '/dash') {
        console.log('we are here')
        next(getDashRedirect())
        return
      }
        
      if (to.matched.some(page => page.meta.requiresAdminAuth)) {
        if (! store.getters.isAdmin) {
          next('/404')
          return
        }      
      }
      
      if (to.matched.some(page => page.meta.requiresCustomerAuth)) {
        console.log(`requires customer ${store.getters.isCustomer}`)
        if (! store.getters.isCustomer) {
          next('/404')
          return
        }      
      }
      
      if (to.matched.some(page => page.meta.requiresProfessionalAuth)) {
        console.log(`requires pro ${store.getters.isProfessional}`)
        if (! store.getters.isProfessional) {
          next('/404')
          return
        }          
      }
    }
    
    if (to.matched.some(page => page.meta.redirectWhenAuth)) {
      if (store.getters.isLoggedIn) {        
        next(getDashRedirect())
        return
      }          
    }

    console.log('authorized')
    next() 
})

const getDashRedirect = function () {
  // TODO use switch
  if (store.getters.isAdmin) {
    return('/admin/dash')    
  }

  if (store.getters.isCustomer) {
    return('/dash/customer')    
  }

  if (store.getters.isProfessional) {
    return('/dash/professional')    
  }  
}

export default router;