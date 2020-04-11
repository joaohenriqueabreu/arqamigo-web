import Rating from '@/models/Rating';

export default {
    state: {
        rating: new Rating()
    },
    mutations: {
        set_feedback(state, feedback) {
            state.feedback.feedback = feedback;
          },
          set_rating(state, rating) {
            state.feedback.rating = rating;
          },   
    },
    actions: {
        giveFeedback({commit}, feedback) {
            commit('set_feedback', feedback);
          },
          setRating({commit}, rating) {
            commit('set_rating', rating);
          }        
    },
    getters: {
        getFeedback: state => state.feedback,
    }
}