import { authMiddleware, adminMiddleware } from './middlewares';

import Admin                from '@/views/admin/Admin';
import AdminDash            from '@/views/admin/AdminDash';

export default [
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
]