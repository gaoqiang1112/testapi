<template>
    <div class="yd-main">
      <router-view></router-view>
      <div class="tab-bar">
        <router-link active-class="active" class="tab-item" :to="{path:'/main/WhiteBar'}">白条</router-link>
        <router-link active-class="active" class="tab-item" :to="{path:'/main/Bill'}">账单</router-link>
        <router-link active-class="active" class="tab-item" :to="{path:'/main/My'}">我的</router-link>
      </div>
    </div>
</template>

<script>
    export default {
        name: "ydMain"
    }
</script>

<style scoped>
  @import 'css/main.css';
</style>
