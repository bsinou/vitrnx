import axios from 'axios';

//    baseURL: 'http://localhost:8888/api',

const apiServer = axios.create({
   // baseURL: 'https://41.sinou.org/api',
   baseURL: 'http://localhost:8888/api',
});

export default apiServer;
