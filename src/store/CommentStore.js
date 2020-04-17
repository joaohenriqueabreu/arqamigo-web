import Comment              from '@/models/Comment';
import CommentCollection    from '@/collections/CommentsCollection';
import http                 from '@/services/http';

export default {
  namespaced: true,
    state: {
      comment:    new Comment(),
      comments:   [],
    },
    mutations: {
      new_comment(state, sender) {
        state.comment = new Comment({                            
          sender: {
            type:   sender.type,
            name:   sender.name,
            photo:  sender.photo,
          },                      
        });            
      },
      set_comment(state, commentData) {
        state.comment = new Comment(commentData);
      },
      set_comments(state, commentsData) {
        state.comments = [];
        commentsData.forEach(commentData => {
          state.comments.push(commentData);
        });
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
      newComment({ commit, rootState }) {
        commit('new_comment', rootState.auth.user);
        this.dispatch('media/clearMedias');
      },
      setComments({commit}, commentsData) {
        commit('set_comments', commentsData);
      },
      commentSent({commit}, commentId) {
        commit('comment_sent', commentId)
      },
      setCommentContent({commit}, content) {
        commit('set_comment_content', content);
      },          
    },
    getters: {
      hasComment: state => state.comment.id !== null      
    }
}