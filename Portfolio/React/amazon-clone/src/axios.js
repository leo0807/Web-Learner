import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5002/clone-8e77f/us-central1/api'
})
export default instance;