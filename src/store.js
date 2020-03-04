import Vue from 'vue'
import Vuex from 'vuex'

import router from '@/router.js';

// Axios config
const axios = require('axios').default;
const api   = axios.create({
  baseURL: process.env.VUE_APP_API_URL
});

Vue.use(Vuex);

const MS_IN_DAY             = 1000 * 60 * 60 * 24;
const ROOMS_DAYS_THRESHOLD  = 30;

const store = new Vuex.Store({
  state: {
    status: false,
    showMenu: false,
    token: localStorage.getItem('token') || '',
    user : {
      id: 123,
      name: "Tony Stark",    
      company_name: "Stark industries",  
      cnpj: "",
      phone: "",
      profile_img_url: 'https://imagens.canaltech.com.br/celebridades/78.400.jpg',
      pinterest_token: localStorage.getItem('p_token') || '',
      // pinterest_board: localStorage.getItem('p_board') || 'https://br.pinterest.com/joaohenriqueabreu/endgame/'
      pinterest_board: localStorage.getItem('p_board') || ''
    },
    rooms: [],
    consultings: [],
    professionals: [],
    customers: [],
  },
  mutations: {
    toggle_menu(state) {
      state.showMenu = !state.showMenu;
    },
    close_menu(state) {
      state.showMenu = false;
    },
    login_success(state, user) {
      state.token  = user; 
      state.status = true;
    },
    login_failed(state) {
      state.token  = '';
      state.status = false;
    },
    logout(state) {
      state.token  = '';
      state.status = false;
    },
    set_rooms(state, rooms) {
      state.rooms = rooms;
    },
    set_consultings(state, consultings) {
      state.consultings = consultings;
    },
    set_customers(state, customers) {      
      state.customers = customers;
    },
    change_profile_image(state, img) {
      state.user.profile_img_url = img;
    },
    set_pinterest_token(state, token) {      
      state.user.pinterest_token = token;            
    },
    set_pinterest_board(state, board) {      
      state.user.pinterest_board = board;            
    }
  },
  actions: {
    toggleMenu({ commit }) {
      commit('toggle_menu');
    },
    closeMenu({ commit }) {
      commit('close_menu');
    },
    login({commit}, user) {
      localStorage.setItem('token', user);
      commit('login_success', user);

      if (user === 'customer') { 
        router.push('/customer'); 
        return
      }

      if (user === 'professional') { 
        router.push('/professional'); 
        return
      }

      commit('logout')
    },
    logout({commit}, user) {
      localStorage.setItem('token', '');
      commit('logout');
      router.push('/login');
    },
    loadRooms({ commit }) {      
        api.get('/rooms').then(res => commit('set_rooms', res.data.rooms));          
    },
    loadConsultings({ commit, getters }) {
      api.get(`/professional/${getters.getUser.id}/consultings`).then(res => commit('set_consultings', res.data.consultings));
    },
    loadCustomers({ commit, getters }) {
      api.get(`/professional/${getters.getUser.id}/customers`).then(res => commit('set_customers', res.data.customers));
    },
    changeProfileImage({ commit }, img_url) {          
      commit('change_profile_image', img_url);
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
    async updateUserProfile({ commit }, data) {
      // TODO here we call backend and persist user profile data
      return new Promise(resolve => setTimeout(resolve, 3000));
    }
  },
  getters: {
    // Layout getters
    isMenuOpened: state => state.showMenu,

    // Auth getters
    getUser: state => state.user,
    isLoggedIn: state => state.token.length > 0,
    isCustomer: state => state.token === 'customer',
    isProfessional: state => state.token === 'professional',    
    getProfileImgUrl: state => state.user.profile_img_url,
    getUsername: state => state.user.name,
    isConnectedToPinterest: (state, getters) => getters.isProfessional && state.user.pinterest_token !== undefined && state.user.pinterest_token.length > 0,    
    hasPinterestBoard: (state, getters) => getters.isProfessional && getters.isConnectedToPinterest && state.user.pinterest_board !== undefined && state.user.pinterest_board.length > 0,
    getPinterestBoard: state => state.user.pinterest_board,
    getUserProfileRoute: (state, getters) => getters.isProfessional ? '/professional/profile' : '/customer/profile',    

    // Rooms getters
    allRooms: state => state.rooms,
    recentRooms: state => state.rooms.filter(room => {
      let roomDt  = new Date(room.created_dt);
      let now     = new Date();
      let diff    = Math.ceil((now - roomDt) / (MS_IN_DAY));      
      return diff <= ROOMS_DAYS_THRESHOLD;
    }),
    otherRooms: state => state.rooms.filter(room => {
      let roomDt  = new Date(room.created_dt);
      let now     = new Date();
      let diff    = Math.ceil((now - roomDt) / (MS_IN_DAY));      
      return diff > ROOMS_DAYS_THRESHOLD;
    }),

    // Consultings getters
    allConsultings: state => state.consultings,  
    mainConsultings: state => state.consultings.slice(0, 3),      
    
    // Customer getters    
    allCustomers: state => state.customers.consulted.concat(state.custemers.interested),
    consultedCustomers: state => state.customers.consulted,
    interestedCustomers: state => state.customers.interested,    
  }
})

export default store;