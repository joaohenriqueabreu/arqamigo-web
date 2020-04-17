import { authMiddleware, preventAuthMiddleware, fancyNavbar } from './middlewares';

import Login            from '@/views/auth/Login';
import Register         from '@/views/auth/Register';
import Profile          from '@/views/auth/Profile';

export default [
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
        path: '/logout',
        name: 'logout',
        component: Login,
        meta: {
          ...preventAuthMiddleware
        }
      },
      {
        path: '/register',
        name: 'register',
        component: Register,
        meta: {
            ...preventAuthMiddleware
          }
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
]