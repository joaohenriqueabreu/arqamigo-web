import Unauthorized     from '@/views/error/404';

export default [
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