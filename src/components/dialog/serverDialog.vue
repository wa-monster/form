<template>
  <el-dialog
    v-if="visible"
    :title="title"
    :visible.sync="visible"
    :before-close="resetForm"
  >
    <el-form
      ref="formData"
      :model="formData"
      label-position="left"
      :label-width="formLabelWidth"
      size="mini"
      :rules="directiveFormRule"
      class="sec-form"
    >
      <el-form-item
        label="服务名称"
        prop="name"
      >
        <el-input
          v-model="formData.name"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="参数描述">
        <i
          v-if="type=='add'"
          class="el-icon-plus addRow"
          @click="addRow"
        ></i>
        <br />
        <el-form-item
          v-for="(item,index) in formData.directives"
          :key="index"
          :label="`指令${index+1}`"
          label-width="56px"
        >
          <el-form
            ref="childForm"
            :rules="childFormRule"
            size="mini"
            :model="formData.directives[index]"
          >
            <el-form-item
              prop="directiveName"
              label-width="0px"
            >
              <el-select
                v-model="item.directiveName"
                placeholder="请选择"
                class="directive-select"
              >
                <el-option
                  v-for="i in directives"
                  :key="i.value"
                  :label="i.label"
                  :value="i.value"
                ></el-option>
              </el-select>
              <i
                v-if="type=='add'"
                class="el-icon-minus removeRow"
                @click="removeRow(item)"
              ></i>
            </el-form-item>
            <el-form-item
              label="姓名"
              prop="name"
              label-width="40px"
            >
              <el-input
                v-model="item.name"
                autocomplete="off"
                style="width:200px"
              ></el-input>
            </el-form-item>
          </el-form>
        </el-form-item>
      </el-form-item>
    </el-form>
    <div
      slot="footer"
      style="text-align: center;"
    >
      <el-button
        type="primary"
        @click="handleSubmit"
      >
        确 定
      </el-button>
      <el-button @click="resetForm">
        取 消
      </el-button>
    </div>
  </el-dialog>
</template>
<script>
const directives = [
  {
    value: "v-if",
    label: "v-if"
  },
  {
    value: "v-bind",
    label: "v-bind"
  },
  {
    value: "v-show",
    label: "v-show"
  }
];
export default {
  name: "DirectiveDiaglog",
  props: {
    title: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "add"
    },
    visible: {
      type: Boolean,
      default: false
    },
    formData: {
      type: Object,
      required: true,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      formLabelWidth: "80px",
      directives: directives,
      directiveFormRule: {
        name: [{ required: true, message: "服务名称不能为空", trigger: "blur" }]
      },
      childFormRule: {
        //   label:[
        //       { required: true, message: "label不能为空", trigger: "blur" }
        //   ]
      },
      id: 1
    };
  },
  methods: {
    addRow() {
      let obj={};
      this.$set(obj,"directiveName","");
      this.$set(obj,"name","");
      this.$parent.serverForm.directives.push(obj);
    },
    removeRow(item) {
      let index = this.$parent.serverForm.directives.indexOf(item);
      if (index !== -1) {
        this.$parent.serverForm.directives.splice(index, 1);
      }
    },
    depClone(data) {
      return JSON.parse(JSON.stringify(data));
    },
    resetForm() {
      this.$refs["formData"].resetFields();
      if (this.$refs["childForm"]) {
        this.$refs["childForm"].forEach(item => {
          item.resetFields();
        });
      }
      let state = false;
      this.$emit("changeSate", state, this.type);
    },
    handleSubmit() {
      let canSubmit = true;
      this.$refs["formData"].validate(valid => {
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
        if (this.type == "add") {
          this.$parent.serverForm.id = this.id;
          this.$parent.serverData.push(this.depClone(this.formData));
          this.id++;
          this.$message({
            message: "添加成功",
            type: "success"
          });
          this.resetForm();
        } else {
          this.$parent.directiveData.forEach(item => {
            if (item.id == this.formData.id) {
              for (let key in item) {
                if (key !== "id") {
                  item[key] = this.formData[key];
                }
              }
            }
          });
          this.$message({
            message: "修改成功",
            type: "success"
          });
          this.$parent.editDialogVisible = false;
        }
      }
    }
  }
};
</script>
<style scoped>
.addRow {
  cursor: pointer;
  float: right;
  margin-top: 5px;
  cursor: pointer;
}
.removeRow {
  margin-left: 8px;
  cursor: pointer;
}
.directive-select {
  width: calc(100% - 22px);
}
</style>