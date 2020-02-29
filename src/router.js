import Vue              from 'vue';
import Router           from 'vue-router';
import store            from '@/store';

import Home             from '@/views/info/Home';
import About            from '@/views/info/About';
import ViewArea         from '@/components/layout/ViewArea';

import Login            from '@/views/auth/Login';
import Register         from '@/views/auth/Register';

import Admin            from '@/views/admin/Admin';

import AdminDash        from '@/views/admin/AdminDash';
import CustomerDash     from '@/views/customer/CustomerDash';

import ProfessionalDash from '@/views/professional/Dashboard';
import ProConsultings   from '@/views/professional/Consultings';
import ProCustomers     from '@/views/professional/Customers';
import ProRoom          from '@/views/professional/Room';
import ProRoomsSearch   from '@/views/professional/RoomsSearch';
import ProProfile       from '@/views/professional/Profile';

import Profile          from '@/views/auth/Profile';

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
    requiresAuth: true,
    requiresCustomerAuth: true
  }
};

const professionalMiddleware = {
  meta: {
    requiresAuth: true,
    requiresProfessionalAuth: true
  }
};

const adminMiddleware = {
  meta: {
    requiresAuth: true,
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
        path: '/customer',        
        component: ViewArea,
        ...customerMiddleware,
        children: [
          {
            path: '',
            name: 'customer.dash',
            component: CustomerDash,            
          }          
        ]
      },
      {
        path: '/professional',        
        component: ViewArea,
        ...professionalMiddleware,        
        children: [
          {
            path: '',
            name: 'professional.dash',
            component: ProfessionalDash,
          },
          {
            path: 'consultings',
            name: 'professional.consultings',
            component: ProConsultings
          },
          {
            path: 'rooms/:id',
            name: 'professional.room',
            component: ProRoom,            
          },
          {
            path: 'customers',
            name: 'professional.customers',
            component: ProCustomers,
          },
          {
            path: 'customers/:id',
            name: 'professional.customer',
            component: ViewArea
          },
          {
            path: 'rooms',
            name: 'professional.rooms',
            component: ProRoomsSearch
          },
          {
            path: 'profile',
            name: 'professional.profile',
            component: ProProfile
          }
        ]
      },      
      {
        path: '/user/profile',
        name: 'user',
        component: Profile,
        ...authMiddleware,
        children: []
      },
      {
        path: '/admin',
        name: 'admin',
        component: Admin,        
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
  // When route changes, close menu if opened  
  if (store.getters.isMenuOpened) {
      store.dispatch('closeMenu');  
    }    

    if (to.matched.some(page => page.meta.requiresAuth)) {  
      console.log('requires auth');
      if (to.matched.some(page => page.meta.requiresAdminAuth)) {
        if (! store.getters.isAdmin) {
          next('/404')
          return
        }      
      }

      if (to.matched.some(page => page.meta.requiresCustomerAuth)) {
        console.log('requires customer auth');
        if (! store.getters.isCustomer) {
          next('/404')
          return
        }      
      }
      
      if (to.matched.some(page => page.meta.requiresProfessionalAuth)) {
        console.log('requires pros auth');
        if (! store.getters.isProfessional) {
          next('/404')
          return
        }          
      }

      console.log('requires auth');
      if (! store.getters.isLoggedIn) {
        console.log('is logged in');
        next('/404')
        return
      }
      
      if (to.path === '/dash') {        
        next(getDashRedirect())
        return
      }                         
    }
    
    if (to.matched.some(page => page.meta.redirectWhenAuth)) {
      if (store.getters.isLoggedIn) {        
        next(getDashRedirect())
        return
      }          
    }

    next() 
})

const getDashRedirect = function () {
  // TODO use switch
  if (store.getters.isAdmin) {
    return('/admin/dash')    
  }

  if (store.getters.isCustomer) {
    return('/customer')    
  }

  if (store.getters.isProfessional) {
    return('/professional')    
  }  
}

export default router;