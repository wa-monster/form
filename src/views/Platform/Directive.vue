<template>
  <div class="instruction">
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
          placeholder="请输入指令名称"
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
        height="500"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="指令名称"
          width="180"
          align="center"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          prop="code"
          label="代码"
          align="center"
          width="180"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          prop="params"
          label="参数描述"
          align="center"
          :show-overflow-tooltip="true"
          :formatter="formatter"
        ></el-table-column>
        <el-table-column
          prop="fn"
          label="功能"
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
              @click="handleDelete(instructionData,scope.row)"
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
import Dialog from "@/components/dialog/instructionDialog.vue";
import { getDirectiveData, delDirectiveData } from "@/api/platform/directive.js";
export default {
  name: "Directive",
  components: {
    Dialog,
  },
  mixins: [mixin],
  data() {
    return {
      inputValue: "",
      inputVisible: false,
      currentData: [],
      instructionForm: {
        name: "",
        code: "",
        fn: "",
        type: 0,
        params: [
          { label: "", name: "", type: 0, default: "" },
          { label: "", name: "", type: 0, default: "" }
        ]
      },
      instructionData: []
    };
  },
  computed: {
    filterData() {
      return this.instructionData.filter(
        data =>
          !this.inputValue ||
          data.name.toLowerCase().includes(this.inputValue.toLowerCase())
      );
    }
  },
  created() {
    this.load();
  },
  methods: {
    async load() {
      try {
        let params = {
          currentPage: this.page.currentPage,
          pageSize: this.page.pageSize
        };
        let res = await getDirectiveData(params);
        this.instructionData = res.list;
        this.page.total = res.total;
      } catch (err) {
        throw err;
      }
    },
    dialogShow(){
      this.$refs['dialog'].show();
    },
    depClone(data) {
      return JSON.parse(JSON.stringify(data));
    },
    handleSelectionChange(val) {
      this.currentData = this.depClone(val);
    },
    formatter(row) {
      return JSON.stringify(row.params);
    },
    resetForm() {
      this.$refs["instructionForm"].resetFields();
      this.$refs["childForm"].forEach(item => {
        item.resetFields();
      });
      this.dialogFormVisible = false;
    },
    remove() {
      if (this.currentData && this.currentData.length !== 0) {
        this.currentData.forEach(item => {
          this.instructionData = this.instructionData.filter(i => {
            return item.id !== i.id;
          });
        });
        this.$message({ message: "删除成功", type: "success" });
        this.currentData = [];
      } else {
        this.$message("请先选择一条数据");
      }
    },
    handleDelete(data, item) {
      this.delete(data,item,delDirectiveData);
    },
    edit(item) {
      this.$refs['dialog'].show(this.depClone(item));
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
<style>
.instruction .btn-group {
  margin-bottom: 10px;
}
.instruction .searchInput {
  width: 160px;
  margin-left: 10px;
}
.instruction .myform-footer {
  text-align: right;
  position: absolute;
  right: 10px;
  bottom: 25px;
}
.sec-form .el-form-item {
  text-align: left;
}
.sec-form > .el-form-item > .el-form-item {
  margin-bottom: 22px;
}
</style>