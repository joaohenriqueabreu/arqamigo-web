import Vue                                  from 'vue';
import { mapState, mapActions, mapGetters } from 'vuex';
import Router                               from 'vue-router';

import Home             from '@/views/info/Home';
import About            from '@/views/info/About';
import ViewArea         from '@/components/layout/ViewArea';

import Login            from '@/views/auth/Login';
import Register         from '@/views/auth/Register';

import Admin            from '@/views/admin/Admin';

import AdminDash            from '@/views/admin/AdminDash';
import CustomerDash         from '@/views/customer/Dashboard';
import SearchProfessionals  from '@/views/customer/SearchProfessionals';
import RoomsList            from '@/views/customer/RoomsList';
import CreateRoom           from '@/views/customer/CreateRoom';
import RoomCreated          from '@/views/customer/RoomCreated';
import CustomerConsultings  from '@/views/customer/Consultings';
import EditRoom             from '@/views/customer/Room';
import ShowProfessional     from '@/views/customer/Professional';

import ProfessionalDash from '@/views/professional/Dashboard';
import ProConsultings   from '@/views/professional/Consultings';
import CustomerIndex    from '@/views/professional/Customers';
import ShowCustomer     from '@/views/professional/Customer';
import SearchRooms      from '@/views/professional/SearchRooms';
import ProProfile       from '@/views/professional/Profile';

import RoomConsulting   from '@/views/room/Consulting';

import Profile          from '@/views/auth/Profile';
import Unauthorized     from '@/views/error/404';

Vue.use(Router);

const state = mapState({
  auth: state => state.auth
});

const getters = mapGetters(['isAdmin', 'isCustomer', 'isProfessional', 'isMenuOpened']);
const actions = mapActions(['validate', 'setPageSubtitle', 'closeMenu', 'changeNavbarStyle']);

const authMiddleware = {
  requiresAuth: true    
};

const preventAuthMiddleware = {  
  redirectWhenAuth: true  
}

const customerMiddleware = {      
  requiresCustomerAuth: true  
};

const professionalMiddleware = {      
  requiresProfessionalAuth: true  
};

const adminMiddleware = {    
  requiresAdminAuth: true  
};

const altNavbar = {
  navbarStyle: 'alt'
};

const noNavbar = {
  navbarStyle: 'transparent'
};

const fancyNavbar = {
  navbarStyle: 'fancy'
}

const noContainer = {
  containerStyle: 'no-container'
}

let router = new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        name: 'home',
        component: Home,
        meta: {
          ...preventAuthMiddleware,
          ...fancyNavbar
        }
        
      },
      {
        path: '/about',
        name: 'about',
        component: About,
        meta: {
          ...fancyNavbar
        }
      },
      {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
          ...preventAuthMiddleware,
          ...fancyNavbar
        }        
      },
      {
        path: '/register',
        name: 'register',
        component: Register
      },
      {
        path: '/customer',        
        component: ViewArea,
        meta: {
          ...authMiddleware,
          ...customerMiddleware,
        },        
        children: [
          {
            path: '',
            name: 'customer.dash',
            component: CustomerDash,            
          },
          {
            path: 'profile',
            name: 'customer.profile',
            component: ProProfile
          },
          {
            path: 'professionals',
            name: 'customer.professionals.search',
            component: SearchProfessionals
          },
          {
            path: 'professionals/:id',
            name: 'customer.professional.show',
            component: ShowProfessional
          },
          {
            path:'rooms/create',
            name: 'customer.rooms.create',
            component: CreateRoom, 
            meta: {
              ...noNavbar         
            }              
          },
          {
            path:'professionals/:id/consultings/create',
            name: 'customer.professionals.consultings.create',
            component: CreateRoom, 
            meta: {
              ...noNavbar         
            }              
          },
          {
            path: 'rooms/created',
            name: 'customer.rooms.created',
            component: RoomCreated,
            meta: {
              ...noNavbar
            }
          },
          {
            path: 'rooms',
            name: 'customer.rooms.index',  
            component: RoomsList          
          },
          {
            path:'rooms/:id',
            name: 'customer.rooms.edit',
            component: EditRoom,
            meta: {
              ...altNavbar
            }            
          },
          {
            path: 'rooms/consultings/:id',
            name: 'customer.rooms.consulting',
            component: RoomConsulting,
            meta: {
              ...noContainer
            }
          },
          {
            path: 'consultings',
            name: 'customer.consultings',
            component: CustomerConsultings,
          }          
        ]
      },
      {
        path: '/professional',        
        component: ViewArea,
        meta: {
          ...authMiddleware,
          ...professionalMiddleware,        
        },
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
            path: 'rooms/consulting/:id',
            name: 'professional.rooms.consulting',
            component: RoomConsulting,
            meta: {
              ...noContainer
            }
          },
          {
            path: 'rooms/consultings/new',
            name: 'professional.rooms.consultings.new',
            component: RoomConsulting,
            meta: {
              ...noContainer
            }
          },
          {
            path: 'customers',
            name: 'professional.customers',
            component: CustomerIndex,
          },
          {
            path: 'customers/:id',
            name: 'professional.customer',
            component: ShowCustomer
          },
          {
            path: 'rooms',
            name: 'professional.rooms',
            component: SearchRooms
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
        meta: {
          ...authMiddleware
        },
        children: []
      },
      {
        path: '/admin',
        name: 'admin',
        component: Admin,        
        meta: {
          ...authMiddleware,
          ...adminMiddleware
        },
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
    ],
});

router.beforeEach(async (to, from, next) => {
  // store.dispatch('setPageSubtitle', '');
  this.setPageSubtitle('');

  // When route changes, close menu if opened  
  if (store.getters.isMenuOpened) {
      store.dispatch('closeMenu');  
  }    

  if (to.matched.some(page => page.meta.requiresAuth)) {  
    console.log('requires auth');
    console.log(store);
    // Page might have been refreshed, check user status from store and then fetch user from server if necessary
    if (store.auth.user === undefined || store.auth.user === null || store.auth.user.empty) {
      try {
        console.log('trying to validate token from server')
        await store.dispatch('validate'); 
      } catch {
        // Any errors redirect to login
        next({ name: 'login'});
      } 
    }

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
  
  // if (to.matched.some(page => page.meta.redirectWhenAuth)) {
  //   if (store.getters.isLoggedIn) {        
  //     next(getDashRedirect())
  //     return
  //   }          
  // }
  
  // Set default navbarStyle (or change)
  store.dispatch('changeNavbarStyle', '');
  if (to.meta.navbarStyle !== undefined) { 
    store.dispatch('changeNavbarStyle', to.meta.navbarStyle);
  }

  store.dispatch('changeContainerStyle', 'container');
  if (to.meta.containerStyle !== undefined) { 
    store.dispatch('changeContainerStyle', to.meta.containerStyle);
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