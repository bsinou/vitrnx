import axios from 'axios';

// axios.defaults.baseURL = 'https://montchenu40.firebaseio.com';
// axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
// axios.defaults.headers.post['Content-Type'] = 'application/json';

const server = axios.create({
    baseURL: 'https://montchenu40.firebaseio.com/'
});

export default server;