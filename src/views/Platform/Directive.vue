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
      <hr />
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
          label="指令名称"
          width="180"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="code"
          label="代码"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="params"
          label="参数描述"
          align="center"
          :formatter="formatter"
        ></el-table-column>
        <el-table-column
          prop="fn"
          label="功能"
          align="center"
        ></el-table-column>
      </el-table>
    </div>
    <div class="myform-footer"></div>
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
    <!-- <el-dialog title v-if="dialogFormVisible" :visible.sync="dialogFormVisible" @close="resetForm">
      <el-form
        :model="instructionForm"
        label-position="left"
        :label-width="formLabelWidth"
        size="mini"
        :rules="instructionFormRule"
        class="sec-form"
        ref="instructionForm"
      >
        <el-form-item label="指令名称" prop="name">
          <el-input v-model="instructionForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="指令代码" prop="code">
          <el-input v-model="instructionForm.code" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="功能描述" prop="fn">
          <el-input v-model="instructionForm.fn" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-radio-group v-model="instructionForm.type">
            <el-radio :label="0">mysql</el-radio>
            <el-radio :label="1">postgres</el-radio>
            <el-radio :label="2">oracle</el-radio>
            <el-radio :label="3">mongodb</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="参数描述">
          <br />
          <el-form-item
            v-for="(item,index) in instructionForm.params"
            :key="index"
            :label="`参数${index+1}`"
            label-width="56px"
          >
            <br />
            <el-form
              :rules="childFormRule"
              ref="childForm"
              size="mini"
              :model="instructionForm.params[index]"
              label-width="65px"
            >
              <el-form-item label="label" prop="label">
                <el-input v-model="item.label" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="变量名" prop="name">
                <el-input v-model="item.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="类型" prop="type">
                <el-radio-group v-model="item.type">
                  <el-radio :label="0">数值</el-radio>
                  <el-radio :label="1">字符</el-radio>
                  <el-radio :label="2">数组</el-radio>
                  <el-radio :label="3">日期</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="默认值" prop="default" style="margin-bottom:0px">
                <el-input v-model="item.default" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
          </el-form-item>
        </el-form-item>
      </el-form>
      <div slot="footer" style="text-align: center;">
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
        <el-button @click="resetForm">取 消</el-button>
      </div>
    </el-dialog>-->
  </div>
</template>
<script>
import addDialog from "@/views/dialog/instructionDiaglog.vue";
import editDialog from "@/views/dialog/instructionDiaglog.vue";
export default {
  name:'Directive',
  components: {
    addDialog,
    editDialog
  },
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
      instructionFormRule: {
        name: [
          { required: true, message: "指令名称不能为空", trigger: "blur" }
        ],
        code: [
          { required: true, message: "指令代码不能为空", trigger: "blur" }
        ],
        fn: [{ required: true, message: "功能描述不能为空", trigger: "blur" }],
        type: [{ required: true, message: "类型不能为空", trigger: "change" }]
      },
      childFormRule: {
        //   label:[
        //       { required: true, message: "label不能为空", trigger: "blur" }
        //   ]
      },
      instructionData: [
        {
          id: 0,
          name: "企业新增",
          code: "gs",
          fn: "新增企业",
          type: 0,
          params: [{ lable: "姓名", name: "name", type: 0, default: "1" }]
        }
      ],
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
  methods: {
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
      console.log(this.currentData);
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
.instruction .searchInput {
  width: 160px;
  margin-left: 10px;
}
.sec-form .el-form-item {
  text-align: left;
}
.sec-form > .el-form-item > .el-form-item {
  margin-bottom: 22px;
}
</style>