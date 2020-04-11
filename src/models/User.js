import { Model }    from 'vue-mc';
import Media        from './Media';
import Location     from './Location';

export default class User extends Model 
{
    defaults() {
        return {
            id:             null,
            public_name:    '',                        
            token:          '',
            private:    {
                first_name: '',
                last_name:  '',
                photo:      new Media(),
                location:   new Location(),
                phone:      '',
                password:   '',
                email:      '',            
            }
        }
    }
}