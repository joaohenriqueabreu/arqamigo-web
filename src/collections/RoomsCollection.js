import { Collection }   from 'vue-mc';
import Room             from '@/models/Room';

module.exports = class RoomsCollection extends Collection
{
    model() {
        return Room;
    }
}
