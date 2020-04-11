import { Collection }   from 'vue-mc';
import Customer         from '@/models/Customer';

export default class CustomersCollection extends Collection
{
    model() {
        return Customer;
    }
}
