import { Model } from 'vue-mc';

export default class Location extends Model 
{
    defaults() {
        return {
            id:             null,
            address:        '',
            neigboorhood:   '',
            number:         '',
            city:           '',
            state:          '',
            country:        '',
            zipcode:        '',
        }
    }
}