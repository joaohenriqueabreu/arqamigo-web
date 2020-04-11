import { Model } from 'vue-mc';

export default class Rating extends Model 
{
    defaults() {
        return {
            id:         null,
            rate:       0,            
            feedback:   '',
        }
    }
}