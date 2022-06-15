import axios from 'axios';
const axiosClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },

});
//add a request interceptor
axiosClient.interceptors.request.use(
  function(config:any){
    return config;
  }
  , function(error:any){
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  function(response:any){
    const { data,status } = response;
    return {data,status};
  }
  , function(error:any){
    return Promise.reject(error);
  }
);

export default axiosClient;
//interceptors
