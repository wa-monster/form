<template>
  <div class="router">
    <div class="myform-header">
      <div class="btn-group">
        <el-button
          type="primary"
          size="medium"
          @click="addDialogVisible=true"
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
        :current-page="currentPage"
        :page-sizes="[5,10,15,20]"
        :page-size="2"
        layout="total, sizes, prev, pager, next, jumper"
        :total="10"
        :background="true"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
    <addDialog
      :visible="addDialogVisible"
      :form-data="routeForm"
      type="add"
      @changeSate="closeDiglog"
    ></addDialog>
    <editDialog
      :visible="editDialogVisible"
      :form-data="currentData[0]"
      type="edit"
      @changeSate="closeDiglog"
    ></editDialog>
  </div>
</template>

<script>
import addDialog from "@/components/dialog/routerDialog.vue";
import editDialog from "@/components/dialog/routerDialog.vue";
export default {
  name: "Router",
  components: {
    addDialog,
    editDialog
  },
  data() {
    return {
      addDialogVisible: false,
      editDialogVisible: false,
      currentData: [],
      inputValue: "",
      currentPage: 1,
      inputVisible: false,
      routeForm: {
        name: "",
        controller: "gs",
        prefix: "新增企业",
        server: ""
      },
      routeData: [
        {
          id: 0,
          name: "新增企业",
          controller: "/gs/sa",
          prefix: "/auto",
          server: "企业新增服务"
        }
      ]
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
  created() {},
  mounted() {},
  methods: {
    remove() {
      if (this.currentData && this.currentData.length !== 0) {
        this.currentData.forEach(item => {
          this.routeData = this.routeData.filter(i => {
            return item.id !== i.id;
          });
        });
        this.$message({ message: "删除成功", type: "success" });
        this.currentData = [];
      } else {
        this.$message("请先选择一条数据");
      }
    },
    handleDelete(item) {
      this.routeData = this.routeData.filter(i => {
        return item.id !== i.id;
      });
    },
    edit(item) {
      this.currentData[0] = item;
      this.editDialogVisible = true;
    },
    closeDiglog(state, type) {
      if (type == "add") {
        this.addDialogVisible = state;
      } else {
        this.editDialogVisible = state;
      }
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
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
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
}
</style>
