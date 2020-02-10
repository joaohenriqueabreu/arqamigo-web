import Vue from 'vue'
import Vuex from 'vuex'

import router from '@/router.js';

// Axios config
const axios = require('axios').default;
const api   = axios.create({
  baseURL: process.env.VUE_APP_API_URL
});

Vue.use(Vuex);
// Vue.use(axios);

const store = new Vuex.Store({
  state: {
    status: false,
    token: localStorage.getItem('token') || '',
    user : {},
    rooms: []
  },
  mutations: {
    // auth_request(state){
    //     state.status = 'loading'
    //   },
    //   auth_success(state, token, user){
    //     state.status = 'success'
    //     state.token = token
    //     state.user = user
    //   },
    //   auth_error(state){
    //     state.status = 'error'
    //   },
    //   logout(state){
    //     state.status = ''
    //     state.token = ''
    //   },
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
    }
  },
  actions: {
    login({commit}, user) {
      localStorage.setItem('token', user);
      commit('login_success', user);

      if (user === 'customer') { 
        router.push('/dash/customer'); 
        return
      }

      if (user === 'professional') { 
        router.push ('/dash/professional'); 
        return
      }

      commit('logout')
    },
    logout({commit}, user) {
      localStorage.setItem('token', '');
      commit('logout');
      router.push('/login');
    },
    loadRooms ({ commit }) {
      return new Promise((resolve, reject) => {
        api.get('/rooms')
        .then(res => res.data)
        .then(({ rooms }) => { commit('set_rooms', rooms) })
        resolve()
      });
    }
    // login({commit}, user){
    //     return new Promise((resolve, reject) => {
    //       commit('auth_request')
    //       axios({url: 'http://localhost:3000/login', data: user, method: 'POST' })
    //       .then(resp => {
    //         const token = resp.data.token
    //         const user = resp.data.user
    //         localStorage.setItem('token', token)
    //         axios.defaults.headers.common['Authorization'] = token
    //         commit('auth_success', token, user)
    //         resolve(resp)
    //       })
    //       .catch(err => {
    //         commit('auth_error')
    //         localStorage.removeItem('token')
    //         reject(err)
    //       })
    //     })
    // },
    // register({commit}, user){
    //     return new Promise((resolve, reject) => {
    //       commit('auth_request')
    //       axios({url: 'http://localhost:3000/register', data: user, method: 'POST' })
    //       .then(resp => {
    //         const token = resp.data.token
    //         const user = resp.data.user
    //         localStorage.setItem('token', token)
    //         axios.defaults.headers.common['Authorization'] = token
    //         commit('auth_success', token, user)
    //         resolve(resp)
    //       })
    //       .catch(err => {
    //         commit('auth_error', err)
    //         localStorage.removeItem('token')
    //         reject(err)
    //       })
    //     })
    //   },
    //   logout({commit}){
    //     return new Promise(resolve => {
    //       commit('logout')
    //       localStorage.removeItem('token')
    //       delete axios.defaults.headers.common['Authorization']
    //       router.push('/login')          
    //       // resolve();
    //     })
    //   }
  },
  getters : {
    isLoggedIn: state => state.token.length > 0,
    isCustomer: state => state.token === 'customer',
    isProfessional: state => state.token === 'professional',    
    recentRooms: state => state.rooms
  }
})

export default store;