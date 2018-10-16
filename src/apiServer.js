import axios from 'axios';

//const prefix = 'https://upala.sinou.org/'
const prefix = 'http://localhost:8888/'

export const publicServer = axios.create({
    baseURL: prefix + 'pub',
 });
const apiServer = axios.create({
    baseURL: prefix + 'api',
});
  
export default apiServer
