<template>
  <div id="app">
    <h2>{{message}}</h2>
    <h2>{{$store.state.counter}}</h2>
    <button @click="addition">+</button>
    <button @click="subtraction">-</button>
    <button @click="addCount(5)">+5</button>
    <button @click="addStudents">Add Students</button>
    <!-- <hello-world :counter="counter"></hello-world> -->
    <h2>{{$store.getters.powerCounter}}</h2>
    <h2>{{$store.getters.overAgeLength}}</h2>
    <h2>{{$store.getters.overAgeSetting(12)}}</h2>
    <hello-world></hello-world>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  data(){
    return {
      message: "hello",
    }
  },
  methods: {
    addition(){
      this.$store.commit('increment');
    },
    subtraction(){
      this.$store.commit('decrement');
    },
    addCount(count) {
      // 1. 普通提交风格
            // this.$store.commit('incrementCount', count);
      // 2. 特殊方式
            this.$store.commit({
              type:"incrementCount",
              count
            });

    },
    updateInfo(){
    //   this.$store.dispatch('aUpdateInfo',{
    //     message: 'payLoad params',
    //     success: () => console.log('successful')
    // });
          this.$store.dispatch('aUpdateInfo',"message").then(res => console.log(res))

    }
  },
  components: {
    HelloWorld
  }
}
</script>

<style>

</style>
