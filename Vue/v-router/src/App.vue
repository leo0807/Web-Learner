<template>
  <div id="app">
  <router-link to="/home" tag="button" replace>Home</router-link>
  <router-link to="/about" replace active-class="active">About</router-link>
  <!-- <router-link to="/profile" replace active-class="active">Profile</router-link> -->
  <router-link :to="'/user/'+userId" replace active-class="active">User</router-link>
  <router-link :to="{path: '/profile', query: {name: 'why', age:18, height: 1.88}}">Profile</router-link>


  <!-- <button @click="homeClick">Home page</button>
  <button @click="profileClick">Profile</button>
  <button @click="aboutClick">about page</button> -->

  <!-- 缓存之前的状态 include/exclude -->
  <keep-alive exclude="About">
    <router-view></router-view>
  </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
      userId: 'zhangsan'
    }
  },
  methods: {
    homeClick:function(){
      this.$router.replace('/home');
      console.log('Home Click');
    },
    aboutClick:function(){
      this.$router.replace('/about');
      console.log('About Click');
    },
    profileClick:function(){
      this.$router.push({
        path: '/profile',
        query: {
          name: 'kobe',
          age: 22,
          height: 2.33
        }
      })
    }
  },
}
</script>

<style>
  .active{
    color: red;
  }
</style>
