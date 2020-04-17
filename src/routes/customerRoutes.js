import { authMiddleware, customerMiddleware, noNavbar, noContainer, altNavbar } from './middlewares';
import ViewArea             from '@/components/layout/ViewArea';

import CustomerDash         from '@/views/customer/Dashboard';
import SearchProfessionals  from '@/views/customer/SearchProfessionals';
import RoomsList            from '@/views/customer/RoomsList';
import CreateRoom           from '@/views/customer/CreateRoom';
import RoomCreated          from '@/views/customer/RoomCreated';
import CustomerConsultings  from '@/views/customer/Consultings';
import RoomEdit             from '@/views/customer/RoomEdit';
import ShowProfessional     from '@/views/customer/Professional';
import RoomConsulting       from '@/views/room/Consulting';
import ProProfile           from '@/views/professional/Profile';

export default [
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
        name: 'customer.professionals.show',
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
        component: RoomEdit,
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
  }
]