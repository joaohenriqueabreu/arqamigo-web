import { Collection }   from 'vue-mc';
import Professional     from '@/models/Professional';

export default class ProfessionalsCollection extends Collection
{
    model() {
        return Professional;
    }
}
