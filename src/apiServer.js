import axios from 'axios';

const apiServer = axios.create({
    baseURL: 'http://localhost:8888/api',
});

export default apiServer;





