import { Collection }   from 'vue-mc';
import Room             from '@/models/Room';

export default class RoomsCollection extends Collection
{
    model() {
        return Room;
    }
}
