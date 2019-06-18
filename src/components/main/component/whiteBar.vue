<template>
  <div class="yd-whiteBar">
    <div class="white-header">
      <div class="headerTop">
        <h1>银多白条</h1>
        <div class="headerTop-img">
          <img src="../img/info@2x.png" alt="">
        </div>
      </div>
      <div class="headerInfo">买单就用银多白条</div>
    </div>
    <div class="white-limit">
      <div class="limit-top">
        <div>
          <p class="limit-topInfo">最高可用额度</p>
          <h1 class="limit-topNum">20,000</h1>
        </div>
        <div class="limit-receive">领取额度</div>
      </div>
      <div class="white-limitInfo">
        <div class="limitInfo-item">
          <img src="../img/main/checkMark@2x.png" alt="">
          <span>循环额度</span>
        </div>
        <div class="limitInfo-item">
          <img src="../img/main/checkMark@2x.png" alt="">
          <span>信用分期</span>
        </div>
        <div class="limitInfo-item">
          <img src="../img/main/checkMark@2x.png" alt="">
          <span>灵活还款</span>
        </div>
      </div>
    </div>
    <div class="white-payBack">
      <img class="payBack-logo" src="../img/main/Bitmap@2x(1).png" alt="">
      <span>您的最近还款日为X月X日</span>
      <a href="#">点击查看 <img src="../img/main/more@2x.png" alt=""></a>
    </div>
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <img src="../img/main/swiper@2x.png" alt="">
        </div>
        <div class="swiper-slide">
          <img src="../img/main/swiper@2x.png" alt="">
        </div>
        <div class="swiper-slide">
          <img src="../img/main/swiper@2x.png" alt="">
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
    <div class="white-strategy">
      <h1>白条攻略</h1>
      <div class="strategy-logo"><img src="../img/main/strategy@2x.png" alt=""></div>
      <div class="strategy-content">
        <div class="strategy-item"><img src="../img/main/limit@2x.png" alt=""></div>
        <div class="strategy-item"><img src="../img/main/borrow@2x.png" alt=""></div>
        <div class="strategy-item"><img src="../img/main/repayment@2x.png" alt=""></div>
      </div>
    </div>
    <div class="white-info">
      <img src="../img/main/line-left@2x.png" alt="">
      <span>买单就用银多白条</span>
      <img src="../img/main/line-right@2x.png" alt="">
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper'
require('swiper/dist/css/swiper.min.css')
export default {
  name: 'HelloWorld',
  data () {
    return {

    }
  },
  mounted(){
    new Swiper ('.swiper-container', {
      loop: true, // 循环模式选项
      // 如果需要分页器
      pagination: {
        el: '.swiper-pagination',
      },
    })
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
