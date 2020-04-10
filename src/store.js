import Vue from 'vue'
import Vuex from 'vuex'
import utils from '@/plugins/utils';
import config from '@/assets/js/config';

import router from '@/router.js';

// Axios config
const axios = require('axios').default;
const api   = axios.create({
  baseURL: process.env.VUE_APP_API_URL
});

Vue.use(Vuex);

const MS_IN_DAY             = 1000 * 60 * 60 * 24;
const ROOMS_DAYS_THRESHOLD  = 365;
// Use from config
const ROOM_STEPS            = ['main', 'categories', 'area', 'details', 'ready']

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    // Layout states
    apiLoaded: true,
    status: false,
    showMenu: false,
    navbarStyle: '',
    containerStyle: 'container',
    pageSubtitle: '',
    message: undefined,

    //Auth states
    token: localStorage.getItem('token') || '',
    user : {
      id: 123,
      name: "Tony Stark",    
      company_name: "Stark industries",  
      cnpj: "",
      phone: "",
      profile_img_url: 'https://imagens.canaltech.com.br/celebridades/78.400.jpg',
      pinterest_token: localStorage.getItem('p_token') || '',
      pinterest_board: localStorage.getItem('p_board') || ''
    },

    // Model states
    rooms:          [],    
    room:           {},
    consultings:    [],    
    consulting:     {},
    customers:      [],
    customer:       {},   
    professionals:  [], 
    professional:   {},
    withProfessional: {}, // Professional to start a consulting with
    medias:         [],
    comment:        {},
    feedback:       {},

    // Room creation states
    currentStep:    config.MAIN_STEP,
    roomSteps:      [
      {step: config.MAIN_STEP, completed: true}, 
      {step: config.CATEGORIES_STEP, completed: false}, 
      {step: config.AREA_STEP, completed: false}, 
      {step: config.MEDIAS_STEP, completed: false}, 
      {step: config.DETAILS_STEP, completed: false}, 
      {step: config.READY_STEP, completed: false}, 
    ],
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
    change_navbar_style(state, style) {
      state.navbarStyle = style;
    },
    change_container_style(state, style) {
      state.containerStyle = style;
    },
    set_message(state, message) {
      state.message = message;      
    },
    show_message(state) {
      setTimeout(() => state.message = undefined, 5000);      
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
      state.token  = ''
      state.status = false
    },
    new_room(state) {
      state.room              = {}
      state.room.medias       = []
      state.room.category     = {}
      state.room.area         = {}
      state.medias            = []
      state.withProfessional  = {}
    },
    set_rooms(state, rooms) {
      state.rooms = rooms;
    },
    set_room(state, room) {
      state.room = room;
    },
    set_medias(state, medias) {
      state.medias = medias;
    },
    prepare_room_for_saving(state) {
      state.room.medias = state.medias;      
      if (state.withProfessional) {
        state.room.consultings = [];
        state.room.consultings.push({
          professional: state.withProfessional
        })
      }      
    },
    set_with_professional(state, professional) {
      state.withProfessional = professional
    },
    room_created(state) {

    },
    set_room_location(state, location) {
      state.room.location = location;
    },
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
    },
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
    upload_media(state, media) {
      state.medias.push(media);
    },  
    remove_media(state, index) {      
      state.medias.splice(index, 1);      
    },
    comment_sent(state, id) {  
      state.comment.id      = id;
      state.comment.medias  = state.medias;          
      state.consulting.comments.push(state.comment);
    },
    next_step(state) {
      const nextStep = config.ROOM_STEPS.indexOf(state.currentStep) + 1;
      state.currentStep = config.ROOM_STEPS[nextStep];
    },
    prev_step(state) {
      const prevStep = config.ROOM_STEPS.indexOf(state.currentStep) - 1;
      state.currentStep = config.ROOM_STEPS[prevStep];
    },
    go_to_step(state, step) {      
      state.currentStep = step;
    },
    complete_step(state, step) {
      const stepIndex = config.ROOM_STEPS.indexOf(step);
      if (stepIndex > -1) {
        state.roomSteps[stepIndex].completed = true;
      }      
    },
    revert_step(state, step) {
      const stepIndex = config.ROOM_STEPS.indexOf(step);
      if (stepIndex > -1) {
        state.roomSteps[stepIndex].completed = false;
      }      
    },
    set_feedback(state, feedback) {
      state.feedback.feedback = feedback;
    },
    set_rating(state, rating) {
      state.feedback.rating = rating;
    },    
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
    changeNavbarStyle({ commit }, style) {
      commit('change_navbar_style', style);
    },
    changeContainerStyle({ commit }, style) {
      commit('change_container_style', style);
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
    newRoom({commit}) {
      commit('new_room');
    },
    loadRooms({ commit }) {      
      return api.get('/rooms').then(res => commit('set_rooms', res.data));          
    },
    loadRoom({commit}, id) {
      commit('start_api');          
      api.get(`/rooms/${id}`).then(res => {        
        commit('set_room', res.data);
        commit('set_medias', res.data.medias);
        commit('api_loaded');
      });
    },
    createRoom({commit, getters}) {
      commit('start_api');          
      commit('prepare_room_for_saving');
      api.post('rooms', { room: getters.getRoom }).then(res => {        
        commit('new_room');
        commit('api_loaded');
        router.push('/customer/rooms/created');
      });
    }, 
    newRoomWithProfessional({commit}, professional) {
      commit('set_with_professional', professional)
      router.push({ name: 'customer.professionals.consultings.create', params: { id: professional.id }})
    },
    setRoom({commit}, room) {
      commit('set_room', room);
    },
    setRoomLocation({commit}, payload) {
      // TODO only grab necessary google places data
      commit('set_room_location', payload);
    },
    navigateToRoom({ commit, getters }, id) {
      const roomRouteName = getters.isCustomer 
        ? 'customer.rooms.edit'
        : 'professional.rooms.consulting';
        
      router.push({ name: roomRouteName, params: { id: id }});
    },
    newConsulting({ commit }) {      
      commit('new_consulting');      
    },
    loadConsulting({ commit }, id) {      
      commit('start_api');          
      api.get(`/consultings/${id}`).then(res => {
        commit('set_page_subtitle', res.data.title);
        commit('set_consulting', res.data);
        commit('set_room', res.data.room);
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
    },
    newComment({ commit }) {
      commit('new_comment');
    },
    setCommentContent({commit}, content) {
      commit('set_comment_content', content);
    },
    uploadMedia({ commit }, media) {
      commit('upload_media', media)
    },
    removeMedia({ commit }, index) {      
      commit('remove_media', index);
    },
    replyConsulting({ commit, getters }, comment) {
      commit('start_api');
      api.post('comments', { comment: getters.getComment, medias: getters.getUploadedMedias }).then(res => {
        commit('comment_sent', res.data.id);
        commit('new_comment');
        commit('api_loaded');
      });
    },
    nextStep({ commit }) {
      commit('next_step');       
    },
    prevStep({commit}) {
      commit('prev_step');      
    },
    goToStep({commit}, step) {
      commit('go_to_step', step);      
    },   
    completeStep({commit}, payload) {
      commit('complete_step', payload.step);

      if (payload.proceed) {
        commit('next_step');
      }      
    }, 
    revertStep({commit}, step) {
      commit('revert_step', step);
    },
    async rateConsulting({commit}, consulting, rate) {

    },
    async authorizeProfessional({commit}, professional) {
      commit('start_api');
      api.post(`customers/professionals/${professional.id}/authorize`).then(res => {        
        commit('api_loaded');
      });
    },
    async closeConsulting({commit}, payload) {
      commit('start_api');
      api.post(`customers/consultings/${payload.consulting.id}/close`, { feedback: payload.feedback }).then(res => {
        commit('api_loaded');
        router.push('/customer'); 
        return;
      })
    },
    async blockProfessional({commit}, professional) {
      commit('start_api');
      api.post(`customers/professionals/${professional.id}/block`).then(res => {
        commit('api_loaded');
        router.push('/customer');
        commit('set_message', 'Profissional bloqueado');
        commit('show_message');
        return;
      });
    },
    setFeedback({commit}, feedback) {
      commit('set_feedback', feedback);
    },
    setRating({commit}, rating) {
      commit('set_rating', rating);
    }
  },
  getters: {
    isApiLoaded: state => state.apiLoaded,

    // Layout getters
    isMenuOpened: state => state.showMenu,
    hasPageSubtitle: state => state.pageSubtitle !== undefined && state.pageSubtitle.length > 0,
    getPageSubtitle: state => state.pageSubtitle,  
    getNavbarStyle: state => state.navbarStyle, 
    getContainerStyle: state => state.containerStyle,
    hasMessage: state => state.message !== undefined,
    getMessage: state => state.message,

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

    getUserDashRoute: (state, getters) => getters.isProfessional ? '/professional' : '/customer',    

    // Rooms index
    allRooms: state => state.rooms,
    // recentRooms: state => state.rooms.filter(room => {
    //   let roomDt  = new Date(room.created_dt);
    //   let now     = new Date();
    //   let diff    = Math.ceil((now - roomDt) / (MS_IN_DAY));      
    //   return diff <= ROOMS_DAYS_THRESHOLD;
    // }),
    recentRooms: state => state.rooms.slice(0, 5),
    // otherRooms: state => state.rooms.filter(room => {
    //   let roomDt  = new Date(room.created_dt);
    //   let now     = new Date();
    //   let diff    = Math.ceil((now - roomDt) / (MS_IN_DAY));      
    //   return diff > ROOMS_DAYS_THRESHOLD;
    // }),
    otherRooms: state => state.rooms.slice(5, state.rooms.length),

    // Consulting chat page
    hasConsulting: state => typeof state.consulting === 'object' && Object.keys(state.consulting).length > 0,
    getConsulting: state => state.consulting,

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
    hasConsultedWithProfessional: state => state.customer.has_consulted_with_professional && typeof state.customer.consultings === 'object' && Object.keys(state.customer.consultings).length > 0,
    getCustomerConsultings: state => state.customer.consultings,

    hasProfessionals: state => state.professionals.length > 0,
    hasProfessional: state => typeof state.professional === 'object' && Object.keys(state.professional).length > 0,
    allProfessionals: state => state.professionals,
    getProfessional: state => state.professional,
    
    hasComment: state => typeof state.comment === 'object' && Object.keys(state.comment).length > 0,
    getComment: state => state.comment,
    hasUploadedMedias: state => state.medias.length > 0,
    getUploadedMedias: state => state.medias,
    
    hasRoom: state => typeof state.room === 'object' && Object.keys(state.room).length > 0,
    getRoom: state => state.room,

    // Room creation steps
    getCreateStep: state => state.currentStep,    
    getCreateStepIndex: state => config.ROOM_STEPS.indexOf(state.currentStep),

    // Need to do one-by-one to trigger bindings
    isMainStepCompleted: state => state.roomSteps[config.ROOM_STEPS.indexOf(config.MAIN_STEP)].completed,    
    isCategoriesStepCompleted: state => state.roomSteps[config.ROOM_STEPS.indexOf(config.CATEGORIES_STEP)].completed,
    isAreaStepCompleted: state => state.roomSteps[config.ROOM_STEPS.indexOf(config.AREA_STEP)].completed,
    isMediasStepCompleted: state => state.roomSteps[config.ROOM_STEPS.indexOf(config.MEDIAS_STEP)].completed,
    isDetailsStepCompleted: state => state.roomSteps[config.ROOM_STEPS.indexOf(config.DETAILS_STEP)].completed,
    isReadyStepCompleted: state => state.roomSteps[config.ROOM_STEPS.indexOf(config.READY_STEP)].completed,    
    isCurrentStepComplete: (state, getters) => state.roomSteps[getters.getCreateStepIndex].completed,

    getFeedback: state => state.feedback,
  }  
})

export default store;