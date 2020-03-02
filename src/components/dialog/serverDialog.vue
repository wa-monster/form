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
      :rules="ServerFormRule"
      class="sec-form"
    >
      <el-form-item
        label="服务名称"
        prop="name"
      >
        <el-input
          v-model="formData.name"
          autocomplete="off"
          placeholder="请输入服务名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="参数描述">
        <i
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
                class="Server-select"
              >
                <el-option
                  v-for="i in Servers"
                  :key="i.value"
                  :label="i.label"
                  :value="i.value"
                ></el-option>
              </el-select>
              <i
                class="el-icon-minus removeRow"
                @click="removeRow(item)"
              ></i>
            </el-form-item>
            <el-form-item
              label="姓名"
              prop="name"
              label-width="50px"
              :rules="{required:item.directiveName!='',message:'请输入姓名',change:'blur'}"
            >
              <el-input
                v-model="item.name"
                autocomplete="off"
                style="width:200px"
                placeholder="请输入姓名"
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
const Servers = [
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
import { addServerData, editServerData } from "@/api/platform/server";
export default {
  name: "ServerDiaglog",
  props: {},
  data() {
    return {
      formLabelWidth: "80px",
      Servers: Servers,
      ServerFormRule: {
        name: [{ required: true, message: "服务名称不能为空", trigger: "blur" }]
      },
      childFormRule: {},
      formData: {
        name: "",
        directives: [
          { directiveName: "", name: "" },
          { directiveName: "", name: "" }
        ]
      },
      visible: false,
      type: "add",
      title: "增加"
    };
  },
  methods: {
    show(item) {
      if (item) {
        for (let key in item) {
          this.formData[key] = item[key];
        }
        console.log(this.formData);
        this.title = "修改";
        this.type = "edit";
      } else {
        this.title = "添加";
        this.type = "add";
      }
      this.visible = true;
    },
    addRow() {
      let obj = {};
      this.$set(obj, "directiveName", "");
      this.$set(obj, "name", "");
      this.formData.directives.push(obj);
    },
    removeRow(item) {
      let index = this.formData.directives.indexOf(item);
      if (index !== -1) {
        this.formData.directives.splice(index, 1);
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
      for (let key in this.formData) {
        if (key == "directives") {
          this.formData[key].forEach(item => {
            for (let i in item) {
              item[i] = "";
            }
          });
        } else {
          this.formData[key] = "";
        }
      }
      this.visible = false;
    },
    async handleSubmit() {
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
          let res = await addServerData(this.formData);
          this.$parent.load();
          this.$message({
            message: "添加成功",
            type: "success"
          });
          this.resetForm();
        } else {
          let res = await editServerData(this.formData);
          this.$parent.load();
          this.$message({
            message: "修改成功",
            type: "success"
          });
          this.resetForm();
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
.Server-select {
  width: calc(100% - 22px);
}
</style>