import Consulting   from '@/models/Consulting';
import Professional from '@/models/Professional';
import Room         from '@/models/Room';
import Comment      from '@/models/Comment';
import http         from '@/services/http';
import router       from '@/routes/index';

export default {
  namespaced: true,
  state: {
      consulting:   new Consulting(),
      consultings:  [],                          
  },
  mutations: {
      new_consulting(state) {
          state.consulting              = {};
          state.consulting.professional = new Professional(state.user);
          state.consulting.room         = new Room(state.room);
          state.consulting.comments     = [];
        },
        set_consulting(state, consultingData) {
          state.consulting          = new Consulting(consultingData);
          state.consulting.room     = new Room(consultingData.room);
          state.consulting.comments = [];
          consultingData.comments.forEach(commentData => {
            state.consulting.comments.push(new Comment(commentData));
          });            
        },
        set_consultings(state, consultingsData) {            
          state.consultings = [];
          consultingsData.forEach((consultingData) => {                            
            state.consultings.push(new Consulting(consultingData));                            
          });            
        },
        sort_consultings_by_last_comment(state) {
          state.consultings.sort((consulting1, consulting2) => {
            return (new Date(consulting1.last_commented_at)) - (new Date(consulting2.last_commented_at));
          });            
        }
  },
  actions: {
      newConsulting({ commit }) {      
          commit('new_consulting');      
        },
        async loadConsulting({ commit }, id) {             
          const response = await http.get(`/consultings/${id}`);          
          commit('set_consulting', response.data);
          
          this.dispatch('layout/setPageSubtitle', response.data.title);
          this.dispatch('room/setRoom', response.data.room);
          this.dispatch('comment/setComments', response.data.comments);   
          this.dispatch('comment/newComment');                           
        },
        async loadConsultings({ commit }) {                              
          const response = await http.get('consultings');          
          commit('set_consultings', response.data);
          commit('sort_consultings_by_last_comment');
        },
        async replyConsulting({ commit, rootState }, comment) {
          // TODO move to commentStore
          const response = await http.post('comments', { comment: rootState.comment.comment, medias: rootState.media.medias });
          this.dispatch('comment/commentSent', response.data.id);
          this.dispatch('comment/newComment');          
        },
        async closeConsulting({ commit }, payload) {          
          await http.post(`customers/consultings/${payload.consulting.id}/close`, { feedback: payload.feedback })
          router.push('/customer'); 
          return;          
        },
        setConsultings({commit}, consultingsData) {
          commit('set_consultings', consultingsData);
        },
        async rateConsulting({commit}, consulting, rate) {

      },
  },
  getters: {
      hasConsulting: state => state.consulting.id !== null,                    
      latestConsultings: state => state.consultings.splice(0, 6),
      otherConsultings: state => state.consultings.filter(otherConsulting => otherConsulting.id !== state.consulting.id)        
  }
}