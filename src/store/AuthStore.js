import User from '@/models/User';
import router from '@/routes/index';
import api from './Api';

export default {
    state: {
        token: localStorage.getItem('token') || '',
        user : new User()
        // {
        //     id: 123,
        //     name: "Tony Stark",    
        //     company_name: "Stark industries",  
        //     cnpj: "",
        //     phone: "",
        //     profile_img_url: 'https://imagens.canaltech.com.br/celebridades/78.400.jpg',
        //     pinterest_token: localStorage.getItem('p_token') || '',
        //     pinterest_board: localStorage.getItem('p_board') || ''
        //   },
    },
    mutations: {
        login_success(state, data) {
            state.user = new User(data);
        },
        login_failed(state) {
            state.user = new User();
        },
        logout(state) {
            state.user = new User();
        },
        change_profile_image(state, img) {
            state.user.profile_img_url = img;
          },
    },
    actions: {
        async login({commit}, payload) {
          try {
            const response = await api.post('login', payload);            
            const user     = response.data;            

            localStorage.setItem('token', user.token);            
            commit('login_success', user);
          } catch {
            console.log('this is an error');
          }
        },
        async validate({commit}) {          
            const token = localStorage.token;
            if (token === undefined || token.length === 0) { throw 'Invalid token'; }
            const respose = await api.get(`validate/${token}`);            
            commit('login_success', respose.data);          
        },
        logout({commit}, user) {
          localStorage.setItem('token', '');
          commit('logout');          
        },
        changeProfileImage({ commit }, img_url) {          
          commit('change_profile_image', img_url);
        },
        async updateUserProfile({ commit }, data) {
          // TODO here we call backend and persist user profile data
          return new Promise(resolve => setTimeout(resolve, 3000));
        },
    },
    getters: {
      getUser: state => state.user,
      isLoggedIn: state => state.user.token.length > 0,
      isCustomer: state => state.user.type === 'customer',
      isProfessional: state => state.user.type === 'professional',    
      getProfileImgUrl: state => state.user.profile_img_url,
      getUsername: state => state.user.name,
      isConnectedToPinterest: (state, getters) => getters.isProfessional && state.user.pinterest_token !== undefined && state.user.pinterest_token.length > 0,    
      hasPinterestBoard: (state, getters) => getters.isProfessional && getters.isConnectedToPinterest && state.user.pinterest_board !== undefined && state.user.pinterest_board.length > 0,
      getPinterestBoard: state => state.user.pinterest_board,
      getUserProfileRoute: (state, getters) => getters.isProfessional ? 'professional.profile' : 'customer.profile',    
      getUserDashRoute: (state, getters) => getters.isProfessional ? 'professional.dash' : 'customer.dash',    
    }
}