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
        key="close"
        class="el-icon-close icon_top_menu icon_top_close"
      ></span>
      <span
        key="left"
        class="el-icon-arrow-left icon_top_menu icon_top_left"
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
      <div @click="handleEnter">
        动画
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
  data(){
    return {
      lefeIcon:true,
    }
  },
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
    handleEnter(){
      this.lefeIcon = !this.lefeIcon
    }
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
    position:relative;
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
.icon_top_menu{
  position:absolute;
  top:50%;
  left:50%;
  margin: -7px -7px;      
}
.icon_top_left{
  transition: all .8s
  opacity: 0;
}
.icon_top_close{
  transition: all .8s
  opacity: 1;
}
.top_left:hover{
  .icon_top_left{
    opacity: 1;
  }
  .icon_top_close{
    opacity: 0;
  }
}
</style>