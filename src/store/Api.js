// Axios config
// const axios = require('axios').default;
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  defaults: {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }
});