<template>
  <div class="server">
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
        <el-button
          type="info"
          size="medium"
          @click="edit"
        >
          修改
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
          label="服务名称"
          width="220"
          align="center"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          prop="directives"
          label="指令集"
          align="center"
          :formatter="formatter"
          :show-overflow-tooltip="true"
        ></el-table-column>
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
      :form-data="serverForm"
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
import addDialog from "@/views/dialog/serverDialog.vue";
import editDialog from "@/views/dialog/serverDialog.vue";
export default {
  name: "Server",
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
      serverForm: {
        name: "",
        directives: [
          { directiveName: "", name: "" },
          { directiveName: "", name: "" }
        ]
      },
      serverData: [
        {
          id: 0,
          name: "新增企业",
          directives: [{ commond: "", param: [] }]
        }
      ]
    };
  },
  computed: {
    filterData() {
      return this.serverData.filter(
        data =>
          !this.inputValue ||
          data.name.toLowerCase().includes(this.inputValue.toLowerCase())
      );
    }
  },
  created() {},
  mounted() {},
  methods: {
    formatter(row) {
      return JSON.stringify(row.directives);
    },
    remove() {
      if (this.currentData && this.currentData.length !== 0) {
        this.currentData.forEach(item => {
          this.serverData = this.serverData.filter(i => {
            return item.id !== i.id;
          });
        });
        this.$message({ message: "删除成功", type: "success" });
        this.currentData = [];
      } else {
        this.$message("请先选择一条数据");
      }
    },
    edit() {
      if (this.currentData && this.currentData.length !== 0) {
        if (this.currentData.length > 1) {
          this.$message("只能选择一条数据");
        } else {
          this.editDialogVisible = true;
        }
      } else {
        this.$message("请先选择一条数据");
      }
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
.server .btn-group {
  margin-bottom: 10px;
}

.server .searchInput {
  width: 160px;
  margin-left: 10px;
}

.server .myform-footer {
  text-align: right;
}
</style>
