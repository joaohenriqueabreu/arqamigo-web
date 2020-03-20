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
const ROOMS_DAYS_THRESHOLD  = 365;

const store = new Vuex.Store({
  state: {
    apiLoaded: true,
    status: false,
    showMenu: false,
    pageSubtitle: '',
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
    room: {},
    consultings: [],    
    customers: [],
    customer: {},   
    professionals: [], 
    professional: {}
  },
  mutations: {
    start_api(state) {
      state.apiLoaded = false;
    },
    api_loaded(state) {
      state.apiLoaded = true;
    },
    toggle_menu(state) {
      state.showMenu = !state.showMenu;
    },
    close_menu(state) {
      state.showMenu = false;
    },
    set_page_subtitle(state, subtitle) {
      state.pageSubtitle = subtitle;
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
    set_room(state, room) {
      state.room = room;      
    },
    set_consultings(state, consultings) {
      state.consultings = consultings;
    },
    set_customers(state, customers) {      
      state.customers = customers;
    },
    set_customer(state, customer) {
      state.customer = customer;
    },  
    set_professionals(state, professionals) {      
      state.professionals = professionals;
    },
    set_professional(state, professional) {
      state.professional = professional;
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
    setPageSubtitle({ commit }, subtitle) {
      commit('set_page_subtitle', subtitle);
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
      return api.get('/rooms').then(res => commit('set_rooms', res.data));          
    },
    loadRoom({ commit }, id) {      
      commit('start_api');          
      api.get(`/rooms/${id}`).then(res => {
        commit('set_page_subtitle', res.data.title);
        commit('set_room', res.data);
        commit('api_loaded');
      });
    },
    loadConsultings({ commit, getters }) {
      commit('start_api');          
      api.get('/consultings').then(res => {        
        commit('set_consultings', res.data);
        commit('api_loaded');
      });
    },
    loadCustomers({ commit, getters }) {
      api.get(`/professional/${getters.getUser.id}/customers`).then(res => commit('set_customers', res.data));
    },
    loadCustomer({ commit, getters }, id) {
      commit('start_api');
      api.get(`/customers/${id}`).then(res => {
        commit('set_customer', res.data);
        commit('api_loaded');
      });
    },
    changeProfileImage({ commit }, img_url) {          
      commit('change_profile_image', img_url);
    },
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
    async updateUserProfile({ commit }, data) {
      // TODO here we call backend and persist user profile data
      return new Promise(resolve => setTimeout(resolve, 3000));
    }
  },
  getters: {
    isApiLoaded: state => state.apiLoaded,

    // Layout getters
    isMenuOpened: state => state.showMenu,
    hasPageSubtitle: state => state.pageSubtitle !== undefined && state.pageSubtitle.length > 0,
    getPageSubtitle: state => state.pageSubtitle,    

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

    // Rooms index
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

    // Single room
    hasRoom: state => typeof state.room === 'object' && Object.keys(state.room).length > 0,
    getRoom: state => state.room,

    // Consultings getters
    allConsultings: state => state.consultings,  
    mainConsultings: state => state.consultings.slice(0, 3),      
    
    // Customer getters    
    allCustomers: state => state.customers.consulted.concat(state.custemers.interested),
    consultedCustomers: state => state.customers.consulted,
    interestedCustomers: state => state.customers.interested,    
    
    hasCustomer: state => typeof state.customer === 'object' && Object.keys(state.customer).length > 0,
    getCustomer: state => state.customer,
    hasPrivateAccessToCustomer: state => state.customer.has_private_access && typeof state.customer.private === 'object' && Object.keys(state.customer.private).length > 0,
    hasConsultedWithProfessional: state => state.customer.has_consulted_with_professional && typeof state.customer.consultings === 'object' && Object.keys(state.customer.consultings.length > 0),
    getCustomerConsultings: state => state.customer.consultings,

    hasProfessionals: state => state.professionals.length > 0,
    hasProfessional: state => typeof state.professional === 'object' && Object.keys(state.professional).length > 0,
    allProfessionals: state => state.professionals,
    getProfessional: state => state.professional    
  }
})

export default store;