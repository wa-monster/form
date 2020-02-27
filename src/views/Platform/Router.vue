<template>
  <div class="router">
    <div class="myform-header">
      <div class="btn-group">
        <el-button
          type="primary"
          size="medium"
          @click="dialogShow"
        >
          添加
        </el-button>
        <el-button
          type="danger"
          size="medium"
          @click="remove"
        >
          删除
        </el-button>
        <el-input
          v-if="inputVisible"
          ref="searchInput"
          v-model="inputValue"
          class="searchInput"
          size="medium"
          placeholder="请输入路由名称"
          @keyup.enter.native="handleInputConfirm"
          @blur="clearVal"
        ></el-input>
        <el-button
          v-else
          size="medium"
          @click="showInput"
        >
          查询
        </el-button>
      </div>
    </div>
    <div class="myform-body">
      <el-table
        :data="filterData"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="路由名称"
          width="220"
          align="center"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          prop="controller"
          label="controller"
          align="center"
          width="220"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          prop="prefix"
          label="前缀"
          align="center"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          prop="server"
          label="服务"
          align="center"
          width="180"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          width="180"
          label="操作"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
            >
              删除
            </el-button>
            <el-button
              size="mini"
              @click="edit(scope.row)"
            >
              修改
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="myform-footer">
      <el-pagination
        :current-page="page.currentPage"
        :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
        :background="true"
        @size-change="sizeChange"
        @current-change="currentChange"
      ></el-pagination>
    </div>
    <Dialog ref="dialog"></Dialog>
  </div>
</template>

<script>
import mixin from "@/views/mixin";
import Dialog from "@/components/dialog/routerDialog.vue";
import { getRouterData, delRouterData } from "@/api/platform/router.js";
export default {
  name: "Router",
  components: {
    Dialog
  },
  mixins: [mixin],
  data() {
    return {
      currentData: [],
      inputValue: "",
      currentPage: 1,
      inputVisible: false,
      routeData: []
    };
  },
  computed: {
    filterData() {
      return this.routeData.filter(
        data =>
          !this.inputValue ||
          data.name.toLowerCase().includes(this.inputValue.toLowerCase())
      );
    }
  },
  created() {
    this.load();
  },
  mounted() {},
  methods: {
    async load() {
      try {
        let params = {
          currentPage: this.page.currentPage,
          pageSize: this.page.pageSize
        };
        let res = await getRouterData(params);
        this.routeData = res.list;
        this.page.total = res.total;
      } catch (err) {
        throw err;
      }
    },
    dialogShow() {
      this.$refs["dialog"].show();
    },
    remove() {
      if (this.currentData && this.currentData.length !== 0) {
        this.delete(this.routeData,this.currentData,delRouterData);
        this.$message({ message: "删除成功", type: "success" });
        this.currentData = [];
      } else {
        this.$message("请先选择一条数据");
      }
    },
    handleDelete(item) {
      this.delete(this.routeData,item,delRouterData);
    },
    edit(item) {
      this.$refs['dialog'].show(this.depClone(item));
    },
    depClone(data) {
      return JSON.parse(JSON.stringify(data));
    },
    handleSelectionChange(val) {
      this.currentData = this.depClone(val);
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.searchInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        console.log(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    clearVal() {
      this.inputVisible = false;
      this.inputValue = "";
    }
  }
};
</script>

<style scoped lang="stylus">
.router .btn-group {
  margin-bottom: 10px;
}

.router .searchInput {
  width: 160px;
  margin-left: 10px;
}
.router .myform-footer {
  text-align: right;
  position: absolute;
  right: 10px;
  bottom: 25px;
}
.router .myform-footer {
  text-align: right;
}
</style>
