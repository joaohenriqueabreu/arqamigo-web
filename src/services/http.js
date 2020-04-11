// Axios config
// const axios = require('axios').default;
import axios from 'axios';

const http = axios.create({
  baseURL: process.env.VUE_APP_API_URL,  
});

const token = localStorage.getItem('token');
if (token) {
  http.defaults.headers.authorization = `Bearer ${token}`;
}

export default http;