import axios from 'axios';

const apiServer = axios.create({
    baseURL: 'http://localhost:8888/api',
    headers: {  
        common: { Authorization: 'AUTH TOKEN' }, 
        post : { 'Content-Type': 'application/json'}
    }    
});

// TODO implement real auth management
// apiServer.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
// That's the default anyway
apiServer.defaults.headers.post['Content-Type'] = 'application/json';


export default apiServer;





