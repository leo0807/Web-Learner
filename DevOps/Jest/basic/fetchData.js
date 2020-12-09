// import { axios } from "axios";
const axios = require('axios');
const url = "http://a.jspang.com/jestTest.json";
export const fetchData = (fn) =>{
    axios.get(url).then(res => {
        fn(res.data);
    })
}

export const fetchTwoData = () =>{
    return axios.get(url);
}

export const fetchThreeData = () =>{
    return axios.get("http://a.jspang.com/jestTest_error.json");
}

export const fetchFourData = () =>{
    return axios.get(url);
}
