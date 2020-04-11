import { Collection }   from 'vue-mc';
import Rating           from '@/models/Rating';

export default class RatingsCollection extends Collection
{
    model() {
        return Rating;
    }
}
