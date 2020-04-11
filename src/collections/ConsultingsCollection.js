import { Collection }   from 'vue-mc';
import Consulting       from '@/models/Consulting';

export default class ConsultingsCollection extends Collection
{
    model() {
        return Consulting;
    }
}
