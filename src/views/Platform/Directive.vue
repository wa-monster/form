<template>
  <div class="instruction">
    <div class="myform-header">
      <div class="btn-group">
        <el-button
          type="primary"
          size="medium"
          @click="addDialogVisible = true"
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
    <addDialog
      :visible="addDialogVisible"
      :form-data="instructionForm"
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
import mixin from "@/views/mixin";
import addDialog from "@/views/dialog/instructionDialog.vue";
import editDialog from "@/views/dialog/instructionDialog.vue";
import { getDirectiveData, delDirectiveData } from "@/api/base/data";
export default {
  name: "Directive",
  components: {
    addDialog,
    editDialog
  },
  mixins: [mixin],
  data() {
    return {
      inputValue: "",
      inputVisible: false,
      addDialogVisible: false,
      editDialogVisible: false,
      formLabelWidth: "80px",
      currentData: [],
      id: 1,
      instructionForm: {
        name: "企业新增",
        code: "gs",
        fn: "新增企业",
        type: 0,
        params: [
          { label: "姓名", name: "name", type: 0, default: "1" },
          { label: "姓名", name: "name", type: 0, default: "1" }
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
    async delete(data, item,fn) {
      try {
        let params;
        if(Array.isArray(item)){
          params=item.map((item)=>{
            return item.id;
          })
        }else{
          params=[];
          params.push(item.id);
        }
        let res = await fn(params);
        data.forEach((i, index) => {
          if (item.id === i.id) {
            data.splice(index, 1);
          }
        });
        if (data.length === 0) {
          if (this.page.currentPage > 1) {
            this.page.currentPage--;
          }
        }
      } catch (err) {
        throw err;
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
    handleSubmit() {
      let canSubmit = true;
      this.$refs["instructionForm"].validate(valid => {
        if (valid) {
          for (let i = 0; i < this.$refs["childForm"].length; i++) {
            this.$refs["childForm"][i].validate(isVaild => {
              if (!isVaild) {
                canSubmit = false;
                return;
              }
            });
          }
        }
      });
      if (canSubmit) {
        this.instructionForm.id = this.id;
        this.instructionData.push(this.depClone(this.instructionForm));
        this.id++;
        this.$message({
          message: "添加成功",
          type: "success"
        });
        this.dialogFormVisible = false;
      }
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
      this.currentData[0] = item;
      this.editDialogVisible = true;
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