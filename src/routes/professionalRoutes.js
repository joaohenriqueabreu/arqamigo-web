import { authMiddleware, professionalMiddleware, noContainer } from './middlewares';
import ViewArea         from '@/components/layout/ViewArea';

import ProfessionalDash from '@/views/professional/Dashboard';
import ProConsultings   from '@/views/professional/Consultings';
import CustomerIndex    from '@/views/professional/Customers';
import ShowCustomer     from '@/views/professional/Customer';
import SearchRooms      from '@/views/professional/SearchRooms';
import ProProfile       from '@/views/professional/Profile';
import RoomConsulting   from '@/views/room/Consulting';

export default [
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
            name: 'professional.customers.index',
            component: CustomerIndex,
          },
          {
            path: 'customers/:id',
            name: 'professional.customers.show',
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
];