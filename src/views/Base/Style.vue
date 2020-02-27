<template>
  <div class="style_box">
    <div class="style_btn">
      <el-button
        size="medium"
        type="primary"
        @click="showDialog"
      >
        添加
      </el-button>

      <el-button
        size="medium"
        @click="activeClick"
      >
        生效
      </el-button>
    </div>
    <el-form
      class="style_main"
      label-width="200"
    >
      <el-form-item label="主题">
        <el-radio label="blue">
          蓝色
        </el-radio>
        <el-radio label="red">
          红色
        </el-radio>
      </el-form-item>
      <el-form-item label="布局">
        <div class="layout_radio">
          <el-radio label="leftTop">
            左上布局
          </el-radio>
        </div>
        <div class="layout_radio">
          <el-radio label="rightTop">
            右上布局
          </el-radio>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name:"Style",
  methods:{
    showDialog(){

    },
    activeClick(){
      
    }
  }
}
</script>

<style lang="stylus" scpoed>
.style_box{
  width:100%;
  height:100%;
  position: relative;
  .style_btn{
    margin-bottom:20px;
  }
  .style_main{
    width: 80%;
    margin:0 auto;
    border:1px solid #ccc;
  }
}
.layout_radio{
  display:inline-block;
  width:calc(50% - 35px)
}
</style>