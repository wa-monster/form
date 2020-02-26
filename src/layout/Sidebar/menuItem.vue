<template>
  <el-submenu
    v-if="item.children"
    :index="basePath"
  >
    <template
      slot="title"
    >
      <i :class="item.meta.icon || 'el-icon-menu'"></i>
      <span>
        {{ item.meta.name }}
      </span>
    </template>
    <MenuItem
      v-for="(child,index) in item.children"
      :key="index"
      :item="child"
      :base-path="indexPath"
    >
    </MenuItem>
  </el-submenu>
  <el-menu-item
    v-else
    :index="indexPath"
  >
    <span slot="title">
      {{ item.meta.name }}
    </span>
  </el-menu-item>
</template>

<script>
export default {
  name:'MenuItem',
  props:{
    item:{
      type:Object,
      default:{}
    },
    basePath:{
      type:String,
      default:''
    }
  },
  computed:{
    indexPath(){
      if(this.basePath === this.item.path){
        return this.basePath
      }else{
        return this.basePath+'/'+this.item.path
      }
      
    }
  },
}
</script>

<style>

</style>