<template>
  <div class="yd-loginPwd">

    <div class="container">
      这是我的
      <button @click="login">登录</button>
      <button @click="register">注册</button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'HelloWorld',
  data () {
    return {

    }
  },
  methods:{
    login(){
      this.$router.push({path:'/passport/login'})
    },
    register(){
      this.$router.push({path:'/passport/Register'})
    },
    goBack(){
      this.$router.go(-1);
    }
  },
  created(){

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../css/main.css';
</style>
