var axios = require('axios');

var axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
  crossDomain: true,
  /* other custom settings */
});

export default axiosInstance;