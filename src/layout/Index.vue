<template>
  <div id="content">
    <Top ref="top"></Top> 
    <el-row class="main">
      <Sidebar v-if="openTop && openMenu">
      </Sidebar>
      
      <div
        class="box"
        :style="(!openMenu||!openTop)? {width: '100%'}:{width:'calc(100% - 227px)'}"
      >
        <div class="box_main">
          <router-view />
        </div>
      </div>
    </el-row>
  </div>
</template>
<script>

import Top from './Top/Top'
import Sidebar from './Sidebar/Sidebar'
export default{
  components:{
    Top,
    Sidebar
  },
  computed:{
    openMenu(){
      return this.$store.state.openMenu
    },
    openTop(){
      return this.$store.state.openTop
    }
  }

}
</script>
<style lang="stylus">
#content {
  height:100%;
  color: #2c3e50;
}

.main{
  height:calc(100% - 41px)
}
.box{
  box-sizing:border-box;
  min-width :800px;
  height:100%;
  float:left;
  padding: 10px;
  .box_main{
    box-sizing:border-box;
    width:100%;
    height:100%;
    padding:10px;
    box-shadow:0px 0px 3px #ccc;
    // background-color:#f5f5f5;
  }
}

</style>