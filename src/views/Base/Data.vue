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
import { getDataList } from '@/api/base/data'
export default {
  name:'Data',
  mixins:[mixin],
  data(){
    return {
      tableData:[]
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
    }
  }
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