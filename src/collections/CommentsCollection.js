import { Collection }   from 'vue-mc';
import Comment          from '@/models/Comment';

export default class CommentsCollection extends Collection
{
    model() {
        return Comment;
    }
}
