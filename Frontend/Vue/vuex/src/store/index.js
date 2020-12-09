import Vue from 'vue';
import Vuex from 'vuex';
// 安装插件
Vue.use(Vuex);
// 创建插件
const store = new Vuex.Store({
    state: {
        // 观察者模式
        // 每一个属性对应以个 Deep Wacther
        // 组件全部被加入到响应式系统
        // 系统监听所有属性
        // 一旦属性发生变化，则系统通知响应的组件随之发生变化，
        // 不在state中添加的属性 不会被监听
        counter: 1000,
        students: [
            { name: "harry", age:23 },
            { name: "poter", age:13 },
            { name: "duke", age:33 },
        ],
        info: 
            { name: "harry", age:23 },

    },
    mutations: {

        // 通常情况下mutaion中方法全是同步方法
        // 因为异步方法 devTools不能很好的追踪

        // methods
        // 包含两个部分 1. 事件类型 2.一个handler 回掉函数，该回掉函数的第一次个参数是state
        // 参数是mutation的载荷 称payload
        increment(state) {
            state.counter++;
        },
        // 默认传入参数state
        decrement(state) {
            state.counter--;
        },
        incrementCount(state, payload) {
            // state.counter += count;
            state.counter += payload.count;
        },
        addStudents(state, stu) {
            state.students.push(stu);
        },
        updateInfo(state) {
            state.info.name = 'coderwhy';//可以触发响应式
            state.info['address'] = 'Los Angels' //无法触发响应式
            Vue.set(state.info, 'address', 'Los Angels') //可以触发响应式

            delete state.info.age //无法触发响应式
            Vue.delete(state.info, 'age')//可以触发响应式
        }
    },
    actions: {
        // 类似于mutation
        // 用于异步操作
        // aUpdateInfo(context, payload) {
        //     setTimeout(() => {
        //         context.commit('updateInfo');
        //         console.log(payload.message);
        //         payload.success();
        //     }, 1000);
        // }
        aUpdateInfo(context, payload) {
            return new Promise(resolve => {
                setTimeout(() => {
                    context.commit('updateInfo');
                    resolve(payload.message)
                }, 100);
            }) 
        }
        
    },
    getters: {
        // 类似于computed，记录state变异后的状态
        // e.g.
        powerCounter(state) {
            return state.counter * state.counter;
        },
        overAgeStu(state) {
            return state.students.filter(s => s.age > 20);
        },
        ageLength(state, getters) {
            return getters.overAgeStu.length;
        },
        overAgeSetting(state) {
            return function (age) {
                return state.students.filter(s => s.age > age);
            } 
        }
        
    },
    modules: {
        // Vue使用单一状态树
        // 当应用变得非常复杂时， store可以变得非常臃肿
        //  =》 this.$store.state.a
        //  =》 this.$store.state.b
        a: {
            state:{},
            mutations:{},
            getters:{},
            actions:{},
        },
        b: {
            state:{},
            mutations:{},
            getters:{},
            actions:{},
        }
    }
})

// 导出store
export default store;