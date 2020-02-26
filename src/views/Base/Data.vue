<template>
  <div class="data_box">
    <div class="data_btn">
      <el-button
        size="medium"
        type="primary"
      >
        添加
      </el-button>
      <el-button
        size="medium"
        type="danger"
      >
        删除
      </el-button>
      <el-button
        size="medium"
        type="info"
      >
        修改
      </el-button>
      <el-button size="medium">
        生效
      </el-button>
    </div>
    <el-table
      ref="Table"
      border
      height="540"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
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
    </el-table>
    <div class="page">
      <el-pagination
        background
        layout="->, prev, pager, next"
        :total="100"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getDataList } from '@/api/base/data'
export default {
  name:'Data',
  data(){
    return {
      tableData:[]
    }
  },
  mounted(){
    this.getList()
  },
  methods:{
  async getList(){
      try{
        let res = await getDataList()
        this.tableData = res.datalist
      }catch(err){
        throw err
      }
    }
  }
}
</script>

<style lang="stylus">
.data_box{
  width:100%;
  height:100%;
  position: relative;
  .data_btn{
    margin-bottom:20px;
  }
}
.page{
  position: absolute;
  bottom: 10px;
  right: 10px;
}
</style>