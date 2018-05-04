import axios from 'axios';

//     baseURL: 'https://41.sinou.org/api',


const apiServer = axios.create({
    baseURL: 'http://localhost:8888/api',
});

export default apiServer;





