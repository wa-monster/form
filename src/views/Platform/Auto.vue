<template>
  <div class="auto_box">
    <div class="auto_btn">
      <el-button
        size="medium"
        type="primary"
        :loading="createLoading"
        @click="createData"
      >
        生成
      </el-button>
      <el-button
        size="medium"
        type="info"
      >
        重置
      </el-button>
      <searchBtn
        :page="page"
        @load="load"
      ></searchBtn> 
      <!-- <el-input
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
      </el-button> -->
    </div>
    <el-table
      ref="Table"
      v-loading="loading"
      border
      height="425"
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        type="selection"
        width="55"
      >
      </el-table-column>
      <el-table-column
        label="数据源"
      >
        <template slot-scope="scope">
          {{ scope.row.origin }}
        </template>
      </el-table-column>
      <el-table-column
        label="表名"
      >
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column
        label="备注"
      >
        <template slot-scope="scope">
          {{ scope.row.remark }}
        </template>
      </el-table-column>
      <el-table-column
        label="是否已经生成"
      >
        <template slot-scope="scope">
          {{ scope.row.create === 'Y' ? '是': '否' }}
        </template>
      </el-table-column>
    </el-table>
    <div class="page">
      <el-pagination
        background
        :page-count="page.currentPage"
        :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
        @current-change="currentChange"
        @size-change="sizeChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import mixin from '@/views/mixin'
import {getAutoList, createAutoList} from '@/api/platform/auto'
import searchBtn from '@/components/little/searchBtn'

export default {
  name:'Auto',
  components:{
    searchBtn
  },
  mixins:[mixin],
  data(){
    return {
      tableData:[],
      activeData:[],
      inputVisible:false,
      createLoading:false,
      loading:true,
    }
  },
  mounted(){
    this.onload()
  },
  methods:{
    async load(){
      try{
        let params = {
          currentPage:this.page.currentPage,
          pageSize:this.page.pageSize,
          keywords:this.page.keywords,
        }
        let res = await getAutoList(params)
        this.tableData = res.list
        this.page.total = res.total
        this.loading = false
      }catch(err){
        throw err
      }
    },
    async createData(){
      try{
        this.createLoading = true
        let res = await createAutoList()

        this.createLoading = false
        this.$message({
          message:'生成成功',
          type: 'success',
          duration:'2000'
        })
      }catch(err){
        throw err
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.auto_box{
  width:100%;
  height:100%;
  position: relative;
  .auto_btn{
    margin-bottom:20px;
    height: 36px;
  }
}
.search_input {
  width: 160px;
  margin-left: 10px;
}
</style>