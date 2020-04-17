import store from '@/store/index';

export default async (to, from, next) => {  
    store.dispatch('layout/setPageSubtitle', '');
  
    // When route changes, close menu if opened  
    if (store.getters['app/isMenuOpened']) {
        store.dispatch('app/closeMenu');  
    }    
  
    if (to.matched.some(page => page.meta.requiresAuth)) {  
      console.log('requires auth');    
  
      // Page might have been refreshed, check user status from store and then fetch user from server if necessary
      /// TODO use vue-mc state
      if (store.state.auth.user === undefined || store.state.auth.user === null || store.state.auth.user.id === null) {
        try {
          console.log('trying to validate token from server');
          const response = await store.dispatch('auth/validate'); 
          console.log(response);
        } catch (err) {
          // Any errors redirect to login
          console.log(err);
          next('/login');
          return;
        } 
      }
  
      if (to.matched.some(page => page.meta.requiresAdminAuth)) {
        if (! store.getters['auth/isAdmin']) {
          next('/404')
          return
        }      
      }
  
      if (to.matched.some(page => page.meta.requiresCustomerAuth)) {
        console.log('requires customer auth');
        if (! store.getters['auth/isCustomer']) {
          next('/404')
          return
        }      
      }
      
      if (to.matched.some(page => page.meta.requiresProfessionalAuth)) {
        console.log('requires pros auth');
        if (! store.getters['auth/isProfessional']) {
          next('/404')
          return
        }          
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
    store.dispatch('layout/changeNavbarStyle', '');
    if (to.meta.navbarStyle !== undefined) { 
      store.dispatch('layout/changeNavbarStyle', to.meta.navbarStyle);
    }
  
    store.dispatch('layout/changeContainerStyle', 'container');
    if (to.meta.containerStyle !== undefined) { 
      store.dispatch('layout/changeContainerStyle', to.meta.containerStyle);
    }
  
    next() 
  }
  
  const getDashRedirect = function () {
    // TODO use switch
    if (store.getters['auth/isAdmin']) {
      return('/admin/dash')    
    }
  
    if (store.getters['auth/isCustomer']) {
      return('/customer')    
    }
  
    if (store.getters['auth/isProfessional']) {
      return('/professional')    
    }  
  }