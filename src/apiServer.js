import axios from 'axios';

// const prefix = 'https://unpasapreslautre.com/'
const prefix = 'http://localhost:8888/'

export const publicServer = axios.create({
    baseURL: prefix + 'pub',
 });
const apiServer = axios.create({
    baseURL: prefix + 'api',
});
  
export default apiServer
