import { Collection }   from 'vue-mc';
import Professional     from '@/models/Professional';

module.exports = class ProfessionalsCollection extends Collection
{
    model() {
        return Professional;
    }
}
