// Axios config
// const axios = require('axios').default;
import axios from 'axios';
import store from '@/store/index';

const http = axios.create({
  baseURL: process.env.VUE_APP_API_URL,  
});

const token = localStorage.getItem('token');
if (token) {
  http.defaults.headers.authorization = `Bearer ${token}`;
}

// Pre request middleware
// http.interceptors.request.use(() => {
//   store.dispatch('app/startApi');
// });

// After request middleware
// http.interceptors.response.use(() => {
//   store.dispatch('app/apiLoaded');
// });

export default http;