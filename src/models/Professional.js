import { Model } from 'vue-mc';
import User      from './User';
import Location  from './Location';
import Media     from './Media';
import Rating    from './Rating';

module.exports = class Professional extends Model 
{
    defaults() {
        return {
            id:                     null,
            user:                   new User(),
            name:                   '',
            company_name:           '',
            is_verified:            '',
            location:               new Location(),
            zipcode:                '',
            photo:                  new Media(),
            rating:                 new Rating(),       
            pinterest_token:        '',
            pintereste_board_url:   '',
        }
    }
}