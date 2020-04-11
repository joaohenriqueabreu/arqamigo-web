import { Model }            from 'vue-mc';
import User                 from './User';
import Location             from './Location';
import Media                from './Media';
import MediasCollection     from '@/collections/MediasCollection';
import RatingsCollection    from '@/collections/RatingsCollection';

export default class Professional extends Model 
{
    defaults() {
        return {
            id:                     null,
            user:                   new User(),
            name:                   '',
            company_name:           '',
            is_verified:            '',
            location:               new Location(),            
            photo:                  new Media(),
            medias:                 new MediasCollection(),
            ratings:                new RatingsCollection(),                             
            pinterest_token:        '',
            pintereste_board_url:   '',
        }
    }
}