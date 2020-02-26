<template>
  <div id="content">
    <Top ref="top"></Top> 
    <el-row class="main">
      <Sidebar v-if="openTop && openMenu">
      </Sidebar>
      <!-- <div
        v-if="openTop && openMenu"
        class="menu_box"
      >
        <el-menu
          active-text-color="#333"
          @select="menuSelect"
        >
          <MenuItem
            v-for="(item, index) in menuList"
            :key="index"
            :item="item"
          ></MenuItem>  
        </el-menu>
      </div> -->
      <div class="box">
        <router-view />
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
  width:calc(100% - 200px);
  float:left;
  padding: 10px;
}
</style>