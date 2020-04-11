import { Model } from 'vue-mc';

export default class Media extends Model 
{
    defaults() {
        return {
            id:         null,
            type:       '',
            name:       '',
            subtitle:   '',
            url:        '',
            thumb:      '',
            size:       0,
        }
    }
}