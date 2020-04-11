import { Model }        from 'vue-mc';
import Customer         from './Customer';
import MediasCollection from '@/collections/MediasCollection';

export default class Room extends Model 
{
    defaults() {
        return {
            id:             null,
            customer:       new Customer(),
            title:          '',
            description:    '',
            category:       '',
            area:      {
                height: 0,
                width:  0,
            },
            medias:         new MediasCollection(),            
        }
    }
}