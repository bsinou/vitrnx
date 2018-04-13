import axios from 'axios';

const server = axios.create({
    baseURL: 'https://montchenu40.firebaseio.com/'
});

export default server;