import { preventAuthMiddleware, fancyNavbar } from './middlewares';
import Home             from '@/views/info/Home';
import About            from '@/views/info/About';

export default [
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
    }
];