<template>
  <div>
  <h2>User Page</h2>
  <h2>{{userId}}</h2>
  </div>
</template>

<script>
export default {
  name: "User",
  computed:{
    userId(){
      return this.$route.params.userId
      // $route 取得处于活跃路由的对象
    },
    beforeRouteEnter (to, from, next) {
      console.log("组件内部导航守卫");
    }
  }
}
</script>

<style scoped>

</style>
