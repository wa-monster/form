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
      <el-button
        size="medium"
      >
        查询
      </el-button>
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
        <template>
          <el-button
            size="mini"
            type="danger"
            @click="deleteClick"
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
export default {
  name:'Form',
  mixins:[mixin],
  data(){
    return {
      tableData:[],
      activeData:[],
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
            this.delete(this.tableData,[row],deleteData)
          }
        });
      
    },
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
  }
}
</style>