import Comment              from '@/models/Comment';
import CommentCollection    from '@/collections/CommentsCollection';
import api                      from './Api';

export default {
    state: {
        comment:    new Comment(),
        comments:   new CommentCollection(),
    },
    mutations: {
        new_comment(state) {
            state.comment = {
              id: 0,
              content: '',
              sender: {
                type: state.token,
                name: state.user.name,
                photo: state.user.profile_img_url,
              },        
              medias: []
            };
            state.medias  = [];
          },
          set_comment_content(state, content) {
            state.comment.content = content;
          },
          comment_sent(state, id) {  
            state.comment.id      = id;
            state.comment.medias  = state.medias;          
            state.consulting.comments.push(state.comment);
          },
    },
    actions: {
        newComment({ commit }) {
            commit('new_comment');
          },
          setCommentContent({commit}, content) {
            commit('set_comment_content', content);
          },
    },
    getters: {
        hasComment: state => typeof state.comment === 'object' && Object.keys(state.comment).length > 0,
        getComment: state => state.comment,
    }
}