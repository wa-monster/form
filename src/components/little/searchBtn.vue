<template>
  <el-input
    v-if="inputVisible"
    ref="search"
    v-model="page.searchKey"
    size="medium"
    class="search_input"
    placeholder="请输入数据源"
    @keypress.enter.native="searchData"
    @blur="clearVal"
  >
  </el-input>
  <el-button
    v-else
    size="medium"
    @click="inputShow"
  >
    查询
  </el-button>
</template>

<script>
import {Debounce} from '@/util/util'

export default {
    name:'',
    props:{
      page:{
        type:Object,
        default:{}
      }
    },
    data() {
        return {
          inputVisible:false,
          deBounce:null,
        };
    },
    watch:{
      'page.searchKey':{
        handler(){
          this.deBounce()
        }
      }
    },
    created() {
      this.deBounce = Debounce(this.searchData,1000)
    },
    mounted() {

    },
    methods: {
      searchData(){
        if(this.page.searchKey === ''){
          return 
        }
        this.$emit('load')
      },
      clearVal(){
        if(this.page.searchKey === ''){
          this.inputVisible = false
          this.searchKey = ""
        }
      },
      inputShow(){
        this.inputVisible = true
        this.$nextTick(()=>{
          this.$refs.search.focus()
        })
      },
    }
};
</script>

<style scoped lang="stylus">

</style>
