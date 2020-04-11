import { Model }    from 'vue-mc';
import User         from './User';  
import Media        from './Media';    

export default class Customer extends Model 
{
    defaults() {
        return {
            id:         null,
            user:       new User(),
            photo:      new Media(),            
        }
    }
}