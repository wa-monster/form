<template>
  <div
    v-if="openTop"
    class="top_row"
  >
    <div
      class="top_left"
      @click="leftClick"
    >
      <span
        class="el-icon-close"
      ></span>
    </div>
    <div
      class="top_mid"
    >
      <div
        class="btn_menu"
        @click="menuClick"
      >
        <span class="el-icon-s-operation icon_menu"></span>
        <span class="text_menu">数据源设置</span>
      </div>
    </div>
    <div
      class="top_right"
    >
      TopForm
    </div>
  </div>
  <div
    v-else
    class="top_row_close"
    @click="leftClick"
  >
    <div class="icon-box">
      <span
        class="el-icon-arrow-right"
      ></span>
    </div>
  </div>
</template>

<script>
export default {
  computed:{
    openMenu(){
      return this.$store.state.openMenu
    },
    openTop(){
      return this.$store.state.openTop
    }
  },  
  methods:{
    menuClick(){
      this.$store.commit('SET_MENU')
    },
    leftClick(){
     this.$store.commit('SET_TOP')
    },
 }
}
</script>
<style lang="stylus" scoped>

</style>

<style lang="stylus" scoped>
.top_row{
  height 40px;
  background-color: #f2f2f2;
  border-bottom: 1px solid #ccc;
  text-align:center;
  &>div{
  height:100%;
  float:left;
  box-sizing: border-box;
  }
  .top_left{
    width:32px;
    line-height:40px;
    text-align:center;
  }
  .top_mid{
    width:calc(100% - 140px);
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    padding: 0 10px;
    font-size:18px;
    .btn_menu{
      float:left;
      height:30px;
      margin:5px;
      line-height: 30px;
      cursor:pointer;
      &:hover{
        background-color: #e6e6e6;
      }
      .icon_menu{
        color: #1c98ce;
      }
      .text_menu{
        padding-left:10px;
      }
    }

  }
  .top_right{
    width:108px;
    line-height 40px;
    font-weight:bold;
    font-size:18px;
  }
}
.top_row_close{
  position:absolute;
  top:0;
  left:0;
  width:32px;
  height:40px;
  z-index:999;
  .icon-box{
    box-sizing:border-box;
    width:32px;
    height:40px;
    border-right:1px solid #ccc;
    border-bottom:1px solid #ccc;
    position:absolute;
    top:0px;
    left:-33px;
    background-color: #f2f2f2;
    line-height 40px;
    transition:all .2s;
    text-align:center;
  }
  &:hover{
    .icon-box{
      left:0px;
    }
  }
}
</style>