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
      :rules="routerFormRule"
    >
      <el-form-item
        label="路由名称"
        prop="name"
      >
        <el-input
          v-model="formData.name"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="controller"
        prop="controller"
      >
        <el-input
          v-model="formData.controller"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="前缀"
        prop="prefix"
      >
        <el-input
          v-model="formData.prefix"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="服务"
        prop="server"
      >
        <el-select
          v-model="formData.server"
          placeholder="请选择"
        >
          <el-option
            v-for="item in server"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
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
const server = [
  {
    value: "企业新增服务1",
    label: "企业新增服务1"
  },
  {
    value: "企业新增服务2",
    label: "企业新增服务2"
  },
  {
    value: "企业新增服务3",
    label: "企业新增服务3"
  }
];
import {addRouterData,editRouterData} from '@/api/platform/router'
export default {
  name: "RouterDialog",
  props: {},
  data() {
    return {
      formLabelWidth: "80px",
      server: server,
      routerFormRule: {
        name: [
          { required: true, message: "路由名称不能为空", trigger: "blur" }
        ],
        controller: [
          { required: true, message: "controller不能为空", trigger: "blur" }
        ],
        prefix: [{ required: true, message: "前缀不能为空", trigger: "blur" }],
        server: [
          { required: true, message: "服务不能不能为空", trigger: "change" }
        ]
      },
      title: "",
      type: "add",
      visible: "",
      formData: {
        name: "",
        controller: "",
        prefix: "",
        server: ""
      }
    };
  },
  methods: {
    depClone(data) {
      return JSON.parse(JSON.stringify(data));
    },
    show(item) {
      if (item) {
        for (let key in item) {
          this.formData[key] = item[key];
        }
        this.title = "修改";
        this.type = "edit";
      } else {
        this.title = "添加";
        this.type = "add";
      }
      this.visible = true;
    },
    resetForm() {
      this.$refs["formData"].resetFields();
      for (let key in this.formData) {
        this.formData[key] = "";
      }
      this.visible = false;
    },
    async handleSubmit() {
      let canSubmit = true;
      this.$refs["formData"].validate(valid => {
        if (valid) {
          canSubmit = true;
        } else {
          canSubmit = false;
        }
      });
      if (canSubmit) {
        if (this.type == "add") {
          let res=await addRouterData(this.formData);
          this.$parent.load();
          this.$message({
            message: "添加成功",
            type: "success"
          });
          this.resetForm();
        } else {
          let res=await editRouterData(this.formData);
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