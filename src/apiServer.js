import axios from 'axios';

const apiServer = axios.create({
   // baseURL: 'https://41.sinou.org/api',
   baseURL: 'http://localhost:8888/api',
});

export default apiServer;
