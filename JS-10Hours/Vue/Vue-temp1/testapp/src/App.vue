<template>
  <div id="app">
    <chat-com></chat-com>
    <userlist-com></userlist-com>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import chatCom from './components/chatcom'
import userlistCom from './components/userlistcom'

export default {
  name: 'App',
  components: {
    chatCom, userlistCom
  }
}
</script>

<style>

</style>
