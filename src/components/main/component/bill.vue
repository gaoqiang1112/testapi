<template>
  <div class="yd-bill">
    <div class="bill-title">
      <p class="billTitle-text">账单</p>
    </div>
    <div class="bill-content">
      <div class="bill-container">
        <div class="billInfo-date">
          <div class="info-dateOther dateBefore"><span class="corn-left"></span><span class="date-text">上一月</span></div>
          <span>2019年7月</span>
          <div class="info-dateOther dataAfter"><span class="date-text">下一月</span><span class="corn-right"></span></div>
        </div>
        <div class="billInfo-content">
          <div class="info-payBack">
            <p>剩余待还（元）</p>
            <h1>1452.30</h1>
            <div class="payBack-date">还款日 <span>07月10日</span></div>
            <button>提前还款</button>
            <ul class="payBack-list">
              <li>
                <div class="payBack-listKey">账单金额</div>
                <div class="payBack-listVal payBack-link">1052.30  <span class="corn-right"></span></div>
              </li>
              <li>
                <div class="payBack-listKey">已还款</div>
                <div class="payBack-listVal">32.30</div>
              </li>
            </ul>
          </div>
        </div>
        <ul class="bill-link">
          <li>
            <span class="billLink-listKey">账单金额</span>
            <span class="corn-right"></span>
          </li>
          <li>
            <span class="billLink-listKey">帮助中心</span>
            <span class="corn-right"></span>
          </li>
        </ul>
      </div>
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
