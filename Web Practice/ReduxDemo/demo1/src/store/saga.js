import { takeEvery} from 'redux-saga/effects';
import {GET_MY_LIST} from './actionTypes';
import {getListAction} from './actionCreators';
import axios from 'axios';

function* mySaga(){
    yield takeEvery(GET_MY_LIST, getList);
}
function* getList(){
    
     const url = 'https://www.easy-mock.com/mock/5cfcce489dc7c36bd6da2c99/xiaojiejie/getList';
    // axios.get(url).then(
    //     (res)=> {
    //         const data = res.data;
    //         const action = getListAction(data);
    //         put(action); 
    //     });
    const res = yield axios.get(url);
    const action = getListAction(res.data);
    yield action
}

export default mySaga;