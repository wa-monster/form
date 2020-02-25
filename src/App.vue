<template>
  <div id="app">
    <el-row class="btn_row">
      <div
        class="btn_left"
      >
        <span class="el-icon-close"></span>
      </div>
      <div
        class="btn_mid"
      >
        按钮
      </div>
      <div
        class="btn_right"
      >
        图标
      </div>
    </el-row>
    <el-row>
      <div>
        asd
      </div>
      <router-view />
    </el-row>
  </div>
</template>
<script>
</script>
<style lang="stylus">

#app {
  text-align: center;
  color: #2c3e50;
}
.btn_row{
  height 36px;
  background-color: #f2f2f2;
  border-bottom: 1px solid #ccc;
}
.btn_row>div{
  height:100%;
  line-height 36px;
  float:left;
  box-sizing: border-box;
}
.btn_left{
  width:32px;
}
.btn_mid{
  width:calc(100% - 140px);
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
}
.btn_right{
  width:108px;
}
</style>
