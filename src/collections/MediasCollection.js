import { Collection }   from 'vue-mc';
import Media            from '@/models/Media';

export default class MediasCollection extends Collection
{
    model() {
        return Media;
    }
}
