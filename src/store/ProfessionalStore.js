import Professional             from '@/models/Professional';
import ProfessionalsCollections from '@/collections/ProfessionalsCollection';
import http                      from '@/services/http';

export default {
  namespaced: true,
    state: {
        professional:   new Professional(),
        professionals:  [],
    },
    mutations: {
        set_professionals(state, professionalsData) {      
            state.professionals = [];
            professionalsData.forEach((professionalData) => {              
              state.professionals.push(new Professional(professionalData));
            });
        },
        set_professional(state, professionalData) {
          state.professional = new Professional(professionalData);          
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
            http.get(`/professionals?term=${term}`).then(res => {            
              commit('set_professionals', res.data);              
            });
          },
          async loadProfessional({ commit }, id) {            
            const response = await http.get(`professionals/${id}`);            
            commit('set_professional', response.data);                          
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
      hasProfessional: state => state.professional.id !== null,
      allProfessionals: state => state.professionals,
      getProfessional: state => state.professional,
    }
}