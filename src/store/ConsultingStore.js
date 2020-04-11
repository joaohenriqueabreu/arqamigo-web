import Consulting               from '@/models/Consulting';
import ConsultingsCollection    from '@/collections/ConsultingsCollection';
import http                      from '@/services/http';
import router from '@/routes/index';

export default {
    state: {
        consulting:     new Consulting(),
        consultings:    new ConsultingsCollection(),            
    },
    mutations: {
        new_consulting(state) {
            state.consulting              = {};
            state.consulting.professional = state.user;
            state.consulting.room         = state.room;
            state.consulting.comments     = [];
          },
          set_consulting(state, consulting) {
            state.consulting = consulting;            
          },
          set_consultings(state, consultings) {
            state.consultings = consultings;
          },
    },
    actions: {
        newConsulting({ commit }) {      
            commit('new_consulting');      
          },
          loadConsulting({ commit }, id) {      
            commit('start_api');          
            http.get(`/consultings/${id}`).then(res => {
              commit('set_page_subtitle', res.data.title);
              commit('set_consulting', res.data);
              commit('set_room', res.data.room);
              commit('api_loaded');
            });
          },
          loadConsultings({ commit, getters }) {
            commit('start_api');          
            http.get('/consultings').then(res => {        
              commit('set_consultings', res.data);
              commit('api_loaded');
            });
          },
          replyConsulting({ commit, getters }, comment) {
            commit('start_api');
            http.post('comments', { comment: getters.getComment, medias: getters.getUploadedMedias }).then(res => {
              commit('comment_sent', res.data.id);
              commit('new_comment');
              commit('api_loaded');
            });
          },
          async closeConsulting({commit}, payload) {
            commit('start_api');
            http.post(`customers/consultings/${payload.consulting.id}/close`, { feedback: payload.feedback }).then(res => {
              commit('api_loaded');
              router.push('/customer'); 
              return;
            })
          },
          async rateConsulting({commit}, consulting, rate) {

        },
    },
    getters: {
        hasConsulting: state => typeof state.consulting === 'object' && Object.keys(state.consulting).length > 0,
        getConsulting: state => state.consulting,
    
        // Consultings getters
        allConsultings: state => state.consultings,  
        mainConsultings: state => state.consultings.slice(0, 3),      
    }
}