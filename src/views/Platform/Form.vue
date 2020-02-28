<template>
  <div class="form_box">
    <div class="form_btn">
      <el-button
        size="medium"
        type="primary"
      >
        添加
      </el-button>
      <el-button
        size="medium"
        type="danger"
        @click="deleteAllClick"
      >
        删除选中
      </el-button>
      <searchBtn
        :page="page"
        @load="load"
      ></searchBtn> 
      <!-- <el-input
        v-if="inputVisible"
        ref="search"
        v-model="searchKey"
        class="search_input"
        size="medium"
        placeholder="请输入数据源"
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
      border
      height="425"
      :data="tableData"
      style="width: 100%"
      @selection-change="tableSelect"
    >
      <el-table-column
        type="selection"
        width="55"
      >
      </el-table-column>
      <el-table-column
        label="表单名称"
      >
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column
        label="id"
        width="100"
      >
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column
        label="action"
        width="120"
      >
        <template slot-scope="scope">
          {{ scope.row.action }}
        </template>
      </el-table-column>
      <el-table-column
        label="表头"
        width="100"
      >
        <template slot-scope="scope">
          {{ scope.row.head }}
        </template>
      </el-table-column>
      <el-table-column
        label="使用说明"
      >
        <template slot-scope="scope">
          {{ scope.row.explain }}
        </template>
      </el-table-column>
      <el-table-column
        label="类型"
        width="80"
      >
        <template slot-scope="scope">
          {{ scope.row.type }}
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="160"
      >
        <template v-slot="scope">
          <el-button
            size="mini"
            type="danger"
            @click="deleteClick(scope)"
          >
            删除
          </el-button>
          <el-button
            size="mini"
            type="info"
          >
            修改
          </el-button>
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
import {getFormList,deleteFormList} from '@/api/platform/form'
import searchBtn from '@/components/little/searchBtn'

export default {
  name:'Form',
  components:{
    searchBtn
  },
  mixins:[mixin],
  data(){
    return {
      tableData:[],
      activeData:[],
      inputVisible:false,
      searchKey:''
    }
  },
  mounted(){
    this.load()
  },
  methods:{
    async load(){
      try{
        let params = {
          currentPage:this.page.currentPage,
          pageSize:this.page.pageSize,
          keywords:this.page.keywords,
        }
        let res = await getFormList(params)
        this.tableData = res.list
        this.page.total = res.total

      }catch(err){
        throw err
      }
    },
    tableSelect(selection){
      this.activeData = selection
    },
    deleteAllClick(){
      if(this.activeData.length === 0){
        return 
      }
      this.$alert(`确定要删除选中的${this.activeData.length}行内容?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          callback: action => {
            this.delete(this.tableData,this.activeData,deleteFormList)
          }
        });
      
    },
    deleteClick(scope){
      let row = scope.row
      this.$alert('确定要删除本行内容?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          callback: action => {
            this.delete(this.tableData,[row],deleteFormList)
          }
        });
    },
    inputShow(){
      this.inputVisible = true
      this.$nextTick(()=>{
        this.$refs.search.focus()
      })
      
    },
    clearVal(){
      this.inputVisible = false
      this.searchKey = ""
    }
  }
}
</script>

<style lang="stylus" scoped>
.form_box{
  width:100%;
  height:100%;
  position: relative;
  .form_btn{
    margin-bottom:20px;
    height: 36px;
  }
}
.search_input {
  width: 160px;
  margin-left: 10px;
}
</style>