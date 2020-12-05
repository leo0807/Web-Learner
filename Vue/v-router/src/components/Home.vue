<template>
  <div>
  <h2>Home Page</h2>
  <router-link to="/home/news">News</router-link>
  <router-link to="/home/message">Message</router-link>
  <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      path: '/home/news'
    }
  },
  // 只有使用keep-alive的包裹的时候 以下两个函数才有用
  // activated() {
  //   this.$router.push(this.path)
  // },
  //  deactivated() {
  //   this.path = this.$route.path;
  // },
  beforeRouteLeave (to, from, next) {
    this.path = this.$route.path;
}
}
</script>

<style scoped>

</style>
