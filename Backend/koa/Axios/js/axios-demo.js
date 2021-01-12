import axios from 'axios';
const url = 'http://localhost:3000';

axios.get(url)
    .then(res => {
        console.log(res);
    })