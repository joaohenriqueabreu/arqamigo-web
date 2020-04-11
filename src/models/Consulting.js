import { Model }            from 'vue-mc';
import Professional         from './Professional';
import Room                 from './Room';
import CommentsCollection   from '@/collections/CommentsCollection';

export default class Consulting extends Model 
{
    defaults() {
        return {
            id:             null,
            room:           new Room(),
            professional:   new Professional(),            
            comments:       new CommentsCollection(),            
        }
    }
}