import { Model } from 'vue-mc';

class User extends Model 
{
    defaults() {
        return {
            id:         null,
            name:       '',
            email:      '',
            password:   '',
        }
    }
}