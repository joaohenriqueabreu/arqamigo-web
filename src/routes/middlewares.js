export const authMiddleware = {
    requiresAuth: true    
  };
  
export const preventAuthMiddleware = {  
    redirectWhenAuth: true  
}
  
  export const customerMiddleware = {      
    requiresCustomerAuth: true  
  };
  
  export const professionalMiddleware = {      
    requiresProfessionalAuth: true  
  };
  
  export const adminMiddleware = {    
    requiresAdminAuth: true  
  };
  
  export const altNavbar = {
    navbarStyle: 'alt'
  };
  
  export const noNavbar = {
    navbarStyle: 'transparent'
  };
  
  export const fancyNavbar = {
    navbarStyle: 'fancy'
  }
  
  export const noContainer = {
    containerStyle: 'no-container'
  }