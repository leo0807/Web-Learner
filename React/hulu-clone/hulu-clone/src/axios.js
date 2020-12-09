import axios from 'axios';

// create axios instance 
const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
})

export default instance;