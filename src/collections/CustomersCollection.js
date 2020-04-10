import { Collection }   from 'vue-mc';
import Customer         from '@/models/Customer';

module.exports = class CustomersCollection extends Collection
{
    model() {
        return Customer;
    }
}
