import { Collection }   from 'vue-mc';
import Consulting       from '@/models/Consulting';

module.exports = class ConsultingsCollection extends Collection
{
    model() {
        return Consulting;
    }
}
