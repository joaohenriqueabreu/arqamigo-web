import { Model }        from 'vue-mc';
import Consulting       from './Consulting';
import MediasCollection from '@/collections/MediasCollection';

export default class Comment extends Model 
{
    defaults() {
        return {
            id:         null,
            content:    '',
            consulting: new Consulting(),
            medias:     new MediasCollection(),            
        }
    }
}