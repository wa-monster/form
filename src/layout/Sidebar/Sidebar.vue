<template>
  <div
    class="menu_box"
  >
    <!-- <el-scrollbar class="page_scrollbar"> -->
    <el-input
      v-model="serachVal"
      class="search_input"
      placeholder="输入文字并搜索"
      @keypress.enter.native="searchMenu"
    >
      <i
        slot="prefix"
        class="el-input__icon el-icon-search"
        @click="searchMenu"
      ></i>
    </el-input>
    <el-menu
      :default-active="currentPath"
      active-text-color="#333"
      @select="menuSelect"
    >
      <MenuItem
        v-for="(item, index) in menuList"
        :key="index"
        :item="item"
        :base-path="item.path"
      ></MenuItem>  
    </el-menu>
    <!-- </el-scrollbar> -->
  </div>
</template>

<script>
import MenuItem from './menuItem'
export default {
  components:{
    MenuItem,
  },
  data(){
    return {
      serachVal:'',
      menuList:[],
      defaultList:[]
    }
  },
  computed:{
    currentPath(){
      return this.$route.path
    }
  },
  created(){
    this.menuList = JSON.parse(JSON.stringify(this.$store.state.menuList))
    this.defaultList = this.$store.state.menuList 
  },
 
  methods:{
    menuSelect(index,indexPath){
      if(index === this.$route.path){
        return 
      }
      this.$router.push(index)
    },
    searchMenu(){
      if(this.serachVal === ''){
        this.menuList= JSON.parse(JSON.stringify(this.defaultList))
        return 
      }
      this.menuList = this.filterMenu(this.menuList)
    },
    filterMenu(List){
      [].filter
      return List.filter(item=>{
        if(item.children){
          item.children = this.filterMenu(item.children)
          if(item.children.length > 0){
            return true
          }else{
            return false
          }
        }
        return item.meta.name.indexOf(this.serachVal) !== -1
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.menu_box{
  width:217px;
  float:left;
  height:100%;
  background-color:#f2f2f2;
  overflow-y:auto;
  overflow-x:hidden;
}

.search_input{
  margin 10px;
  width: 180px;
}
</style>