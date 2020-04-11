import Professional             from '@/models/Professional';
import ProfessionalsCollections from '@/collections/ProfessionalsCollection';
import api                      from './Api';

export default {
    state: {
        professional:   new Professional(),
        professionals:  new ProfessionalsCollections(),
    },
    mutations: {
        set_professionals(state, professionals) {      
            state.professionals = professionals;
          },
          set_professional(state, professional) {
            state.professional = professional;
          },
          set_pinterest_token(state, token) {      
            state.user.pinterest_token = token;            
          },
          set_pinterest_board(state, board) {      
            state.user.pinterest_board = board;            
          },
    },
    actions: {
        searchProfessionals({ commit }, term) {
            commit('start_api');          
            api.get(`/professionals?term=${term}`
            //   { url: '/customer/professionals/',
            //   data: term
            // })
            ).then(res => {            
              commit('set_professionals', res.data);
              commit('api_loaded');
            });
          },
          loadProfessional({ commit }, id) {
            commit('start_api');
            api.get(`professionals/${id}`).then(res => {
              commit('set_professional', res.data);
              commit('api_loaded');
            });
          },
          setPinterestToken({ commit }, token) {
            const board = 'https://www.pinterest.com/joaohenriqueabreu/endgame/';
            // need to store token on storage as pinterest refreshes screen after successful login
            localStorage.setItem('p_token', token);      
            commit('set_pinterest_token', token);
          },
          setPinterestBoard({ commit }, board) {                  
            localStorage.setItem('p_board', board);     
            commit('set_pinterest_board', board);
          },
    },
    getters: {
        hasProfessionals: state => state.professionals.length > 0,
    hasProfessional: state => typeof state.professional === 'object' && Object.keys(state.professional).length > 0,
    allProfessionals: state => state.professionals,
    getProfessional: state => state.professional,
    }
}