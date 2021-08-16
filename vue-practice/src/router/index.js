import Vue from 'vue';
import VueRouter from 'vue-router';

import HelloWorld from '../component/HelloWorld';
Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        {
            path: '/main',
            name: 'main',
            component: HelloWorld
        }
    ]
})