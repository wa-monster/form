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
        label="日期"
        width="120"
      >
        <template slot-scope="scope">
          {{ scope.row.date }}
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        show-overflow-tooltip
      >
      </el-table-column>
    </el-table>
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
  .data_btn{
    margin-bottom:10px;
  }
}
</style>