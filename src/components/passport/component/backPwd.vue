<template>
  <div class="diTuPage" onselectstart="return false">
    <div class="header" >
      <div class="header_l">
        <div class="header_l_t">
          <div class="header_l_t_text">起点：</div>
          <div class="input_border" >
            <input  type="text" v-model="startNodeName">
            <img  width="16" src="../img/clear.png"  @click="clearName(0)">
          </div>
        </div>
        <div class="header_l_b">
          <div class="header_l_b_text">终点：</div>
          <span class="input_border">
            <input  type="text" v-model="endNodeName">
            <img  width="16" src="../img/clear.png"  @click="clearName(1)">
          </span>
        </div>
      </div>
      <div class="header_r" @click="searchWay">
        搜索
      </div>
    </div>
    <div style="height: 70px"></div>
    <div class="diTu" :style="{visibility:canShow?'visible':'hidden'}">
      <div class="diTuList">
        <div class="diTuListItem" :class="[activeNo ==index ? 'isActive' : '', 'diTuListItem']" v-for="(item,index) in list" >
          <div class="diTuListItem_t" @click="getPlaneChart(item.PlaneChartId,index)">
            {{item.PlaneChartName}}
          </div>
        </div>
      </div>
      <div class="fatherBg" ref="fatherBg" :style="{width:fatherBgWidth+'px',height:'100%'}">
        <img class="diTuImg" :src="dataTwo.Background" :width="fatherBgWidth" :height="fatherBgHeight"   @load="loadImage">
        <canvas id="drawBuilding" ref="drawBuilding" :width="fatherBgWidth" :height="fatherBgHeight"></canvas>
        <canvas id="drawWay" ref="drawWay" :width="fatherBgWidth" :height="fatherBgHeight"></canvas>
      </div>
    </div>
    <div class="sliderBar_l" >
      <div style="margin-bottom: 15px;display: block;border-bottom: 1px solid #000;width: 10px"></div>
      <div :style="{ height: '100px'}">
        <van-slider v-model="slideValue" vertical :minSideValue="minSideValue" :maxSideValue="maxSideValue" :step="step" />
      </div>
      <span style="margin-top: 5px;transform: scale(1.3)">+</span>
    </div>
    <div class="sliderBar_r" @click="resetMap">
      还原
    </div>
  </div>
</template>

<script>
  export default {
    name: 'diTu',
    data () {
      return {
        list:[],
        dataTwo:{},
        activeNo:0,
        dataTwoShow:false,
        fatherBgWidth:'',
        fatherBgHeight:'',
        planeChartId:'',
        startNodeName:'',
        endNodeName:'',
        wCtx:null,
        bCtx:null,
        scaleNum:0,
        slideValue:0,
        minSideValue:0,
        maxSideValue:1,
        step:0.01,
        canShow:false
      }
    },
    created(){
      this.init()
    },
    mounted(){
      this.initCanvas()
    },
    watch:{
      slideValue:function (newV,oldV) {
        if(oldV!=0){
          this.scaleNum=(this.minSideValue+(this.step*newV))
          this.$refs.fatherBg.style.cssText = 'zoom: '+(this.minSideValue+(this.step*newV))+';';
        }
      }
    },
    methods:{
      init(){  // 初始化获取列表
        const that = this;
        const params={
          url:'/News/GetPlaneChart',
        }
        this.$http.postRequest(params).then(function (response) {
          if(response.Code == 1){
            that.list = response.Data;
            that.getPlaneChart(response.Data[0].PlaneChartId)
          }else(
            alert(response.Message)
          )
        })
      },
      initCanvas(){  // 初始化canvas
        const wayCanvas = this.$refs.drawWay;
        this.wCtx = wayCanvas.getContext('2d');
        const buildingCanvas = this.$refs.drawBuilding;
        this.bCtx = buildingCanvas.getContext('2d');
      },
      getPlaneChart(id,index){  // 根据列表id获取地图及building信息
        const that = this;
        that.planeChartId = id;
        that.activeNo = index || 0;
        const params={
          url:'/News/GetPlaneChart_PlaneChartId',
          planeChartId:id
        }
        this.$http.postRequest(params).then(function (response) {
          if(response.Code == 1){
            that.dataTwo = response.Data;
            that.scaleNum = window.screen.width/that.dataTwo.DWidth;
            that.slideValue = window.screen.width/that.dataTwo.DWidth;
            that.minSideValue = window.screen.width/that.dataTwo.DWidth;

            that.fatherBgWidth = that.dataTwo.DWidth;
            that.fatherBgHeight = that.dataTwo.DHeight;
          }else(
            alert(response.Message)
          )
        })
      },
      searchWay(){   // 搜索路线
        const that = this;
        const params={
          url:'/News/GetPlanePath_BoothName',
          planeChartId:that.planeChartId,
          startNodeName:that.startNodeName,
          endNodeName:that.endNodeName
        }
        this.$http.postRequest(params).then(function (response) {
          if(response.Code == 1){
            that.endNodeName = response.Data.EndNodeName;
            that.startNodeName = response.Data.StartNodeName;
            const startBoothId = response.Data.StartBoothId;
            const endBoothId = response.Data.EndBoothId;
            const drawBuildingList = [
              that.dataTwo.lst[startBoothId],
              that.dataTwo.lst[endBoothId]
            ];
            that.$nextTick(function() {
              that.drawBuilding(that.bCtx,drawBuildingList)
              that.drawWay(that.wCtx,response.Data.lst);
            })
          }else(
            alert(response.Message)
          )
        })
      },
      // 画building上的文字
      drawText(_paint, _text, _fontSzie, _color, _textAlign, _textBaseline, _startX, _height) {
        _paint.font = _fontSzie;
        _paint.fillStyle = _color;
        _paint.textAlign = _textAlign;
        _paint.textBaseline = _textBaseline;
        _paint.fillText(_text, _startX, _height);
      },
      // 画建筑
      drawBuilding(bCtx,dataInfo){
        bCtx.clearRect(0,0,this.dataTwo.DWidth,this.dataTwo.DHeight);
        bCtx.beginPath();
        for (let i =0;i<dataInfo.length;i++){
          const item = dataInfo[i];
          let calculationResult = item.DWidth;
          if(item.DWidth < item.DHeight){
            calculationResult= item.DWidth/5
          }else{
            calculationResult= item.DHeight/5
          }
          const fontSize = calculationResult;
          const fontColor = 'red';
          const logoW = calculationResult;
          const logoH = calculationResult;
          const x = item.PointX;
          const y = item.PointY;
          const w = item.DWidth;
          const h = item.DHeight;
          const logoX = x+(w-(logoW+item.BoothName.length*fontSize))/2;
          const logoY = y+(h/2-logoH/2);
          bCtx.fillStyle="#eaeaea";
          bCtx.fillRect(item.PointX,item.PointY,item.DWidth,item.DHeight);
          this.drawText(bCtx, item.BoothNo, fontSize+"px bold 黑体", fontColor, 'left', 'top', x, y);
          this.drawText(bCtx, item.BoothName, fontSize+"px bold 黑体", fontColor, 'left', 'middle', logoX+logoW, y+h/2);
          this.drawText(bCtx, item.BoothNo, fontSize+"px bold 黑体", fontColor, 'right', 'bottom', x+w, y+h);
          // 画logo
          const img = new Image();
          img.src='https://asks.oss-cn-beijing.aliyuncs.com/daihuahua/logo/logo_512.png';
          img.onload=function(){
            bCtx.drawImage(img,logoX,logoY,logoW,logoH)
          }
          // 画起点终点图
          const img2 = new Image();
          const shuiDiW = 30;
          const shuiDiH = 38;
          if(i == 0){
            img2.src='https://asks.oss-cn-beijing.aliyuncs.com/ydzbapp/u88_q.jpg';
          }else{
            img2.src='https://asks.oss-cn-beijing.aliyuncs.com/ydzbapp/u88_z.jpg';
          }
          img2.onload=function(){
            bCtx.drawImage(img,logoX,logoY,logoW,logoH)
            bCtx.drawImage(img2,x+w/2-shuiDiW/2,y+h/2-shuiDiH,shuiDiW,shuiDiH)
          }
        }
        bCtx.closePath();
      },
      // 画路线
      drawWay(wCtx,dataInfo){
        wCtx.clearRect(0,0,this.dataTwo.DWidth,this.dataTwo.DHeight);
        wCtx.beginPath();
        for (let i =1;i<dataInfo.length;i++){
          const item = dataInfo[i];
          wCtx.strokeStyle=item.Stroke;
          wCtx.lineWidth=item.Thickness;
          wCtx.moveTo(item.X1,item.Y1);
          wCtx.lineTo(item.X2,item.Y2);
        }
        wCtx.stroke()
        wCtx.closePath();
      },
      // 地图加载完 触发
      loadImage(){
        this.drawBuilding(this.bCtx,[]);
        this.drawWay(this.wCtx,[]);
        this.$refs.fatherBg.style.cssText = 'zoom: '+this.scaleNum+';';
        this.canShow=true
      },
      resetMap(){  // 重置页面
        this.slideValue=0;
        this.drawBuilding(this.bCtx,[]);
        this.drawWay(this.wCtx,[]);
        this.endNodeName='';
        this.startNodeName='';
      },
      clearName(n){  // input后面的清除
        if(!!n){
          this.endNodeName='';
        }else {
          this.startNodeName='';
        }
      }
    },
  }
</script>

<style scoped >
  @import "../css/backPwd.css";
</style>
