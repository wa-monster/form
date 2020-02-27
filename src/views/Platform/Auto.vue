<template>
  <div class="auto_box">
    <div class="auto_btn">
      <el-button
        size="medium"
        type="primary"
      >
        添加
      </el-button>
      <el-button
        size="medium"
        type="info"
      >
        重置
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
        label="表明"
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
import {getAutoList} from '@/api/platform/auto'
export default {
  name:'Auto',
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
        let res = await getAutoList(params)
        this.tableData = res.list
        this.page.total = res.total

      }catch(err){
        throw err
      }
    },
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
  }
}
</style>