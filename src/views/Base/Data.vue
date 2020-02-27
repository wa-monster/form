<template>
  <div class="data_box">
    <div class="data_btn">
      <el-button
        size="medium"
        type="primary"
        @click="showDialog"
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
        @click="activeClick"
      >
        选中生效
      </el-button>
    </div>
    <el-table
      ref="Table"
      border
      height="500"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="tableSelect"
    >
      <el-table-column
        type="selection"
        width="55"
      >
      </el-table-column>
      <el-table-column
        label="名称"
      >
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column
        label="描述"
      >
        <template slot-scope="scope">
          {{ scope.row.description }}
        </template>
      </el-table-column>
      <el-table-column
        label="标志"
        width="120"
      >
        <template slot-scope="scope">
          {{ scope.row.sign }}
        </template>
      </el-table-column>
      <el-table-column
        label="信息"
        width="120"
      >
        <template slot-scope="scope">
          {{ scope.row.info }}
        </template>
      </el-table-column>
      <el-table-column
        label="类型"
        width="120"
      >
        <template slot-scope="scope">
          {{ scope.row.type }}
        </template>
      </el-table-column>
      <el-table-column
        v-slot="scope"
        label="操作"
        width="160"
      >
        <template>
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
            @click="editDialog(scope)"
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
    <DataDialog
      ref="dataDialog"
      @onload="load"
    >  
    </DataDialog>
  </div>
</template>

<script>
import mixin from '@/views/mixin'
import DataDialog from '@/components/dialog/dataDialog'

import { getDataList,activeData,deleteData } from '@/api/base/data'
export default {
  name:'Data',
  components:{
    DataDialog
  },
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
        let res = await getDataList(params)
        this.tableData = res.list
        this.page.total = res.total

      }catch(err){
        throw err
      }
    },
    showDialog(){
      this.$refs.dataDialog.show();
    },
    editDialog(scope){
       this.$refs.dataDialog.show(scope.row);
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
            this.delete(this.tableData,this.activeData,deleteData)
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
    async activeClick(){
      try{
        let res = await activeData(this.activeData)
        this.$message.success('生效成功')
      }catch(err){
        throw err
      }
    }
  },
    
}
</script>

<style lang="stylus" scoped>
.data_box{
  width:100%;
  height:100%;
  position: relative;
  .data_btn{
    margin-bottom:20px;
  }
}

</style>