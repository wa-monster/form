<template>
  <el-input
    v-if="inputVisible"
    ref="search"
    v-model="page.keywords"
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
      'page.keywords':{
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
        if(this.page.keywords === ''){
          return 
        }
        this.$emit('load')
      },
      clearVal(){
        if(this.page.keywords === ''){
          this.inputVisible = false
          this.keywords = ""
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
