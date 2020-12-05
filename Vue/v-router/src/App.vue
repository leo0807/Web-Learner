<template>
  <div id="app">
  <router-link to="/home" tag="button" replace>Home</router-link>
  <router-link to="/about" replace active-class="active">About</router-link>
  <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  .active{
    color: red;
  }
</style>
