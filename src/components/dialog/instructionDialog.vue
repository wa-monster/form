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
      :rules="instructionFormRule"
      class="sec-form"
    >
      <el-form-item
        label="指令名称"
        prop="name"
      >
        <el-input
          v-model="formData.name"
          autocomplete="off"
          placeholder="请输入指令名称"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="指令代码"
        prop="code"
      >
        <el-input
          v-model="formData.code"
          autocomplete="off"
          placeholder="请输入指令代码"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="功能描述"
        prop="fn"
      >
        <el-input
          v-model="formData.fn"
          autocomplete="off"
          placeholder="请输入功能描述"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="类型"
        prop="type"
      >
        <el-radio-group v-model="formData.type">
          <el-radio :label="0">
            mysql
          </el-radio>
          <el-radio :label="1">
            postgres
          </el-radio>
          <el-radio :label="2">
            oracle
          </el-radio>
          <el-radio :label="3">
            mongodb
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="参数描述">
        <br />
        <el-form-item
          v-for="(item,index) in formData.params"
          :key="index"
          :label="`参数${index+1}`"
          label-width="56px"
        >
          <br />
          <el-form
            ref="childForm"
            :rules="childFormRule"
            size="mini"
            :model="formData.params[index]"
            label-width="65px"
          >
            <el-form-item
              label="label"
              prop="label"
            >
              <el-input
                v-model="item.label"
                autocomplete="off"
                placeholder="请输入label"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="变量名"
              prop="name"
            >
              <el-input
                v-model="item.name"
                autocomplete="off"
                placeholder="请输入变量名"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="类型"
              prop="type"
            >
              <el-radio-group v-model="item.type">
                <el-radio :label="0">
                  数值
                </el-radio>
                <el-radio :label="1">
                  字符
                </el-radio>
                <el-radio :label="2">
                  数组
                </el-radio>
                <el-radio :label="3">
                  日期
                </el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item
              label="默认值"
              prop="default"
              style="margin-bottom:0px"
            >
              <el-input
                v-model="item.default"
                autocomplete="off"
                placeholder="请输入默认值"
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
import {addDirectiveData,editDirectiveData} from '@/api/platform/directive'
export default {
  name: "InstructionDiaglog",
  data() {
    return {
      formLabelWidth: "80px",
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
      },
      visible:false,
      title:"",
      formData:{
        name: "",
        code: "",
        fn: "",
        type: 0,
        params: [
          { label: "", name: "", type: 0, default: "" },
          { label: "", name: "", type: 0, default: "" }
        ]
      },
      type:"add",
    };
  },
  methods: {
    depClone(data) {
      return JSON.parse(JSON.stringify(data));
    },
    show(item){
      if(item){
        for(let key in item){
          this.formData[key]=item[key];
        }
        this.title="修改"
        this.type="edit"
      }else{
        this.title="添加"
        this.type="add"
      }
      this.visible=true;
    },
    resetForm() {
      this.$refs["formData"].resetFields();
      this.$refs["childForm"].forEach(item => {
        item.resetFields();
      });
      for(let key in this.formData){
        if(key=="params"){
          this.formData[key].forEach((item)=>{
            for(let i in item){
              if(i=="type"){
                item[i]=0
              }else{
                item[i]=""
              }
            }
          })
        }else if(key=="type"){
          this.formData[key]=0
        }else{
          this.formData[key]=""
        }
      }
      this.visible=false;
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
          let res=await addDirectiveData(this.formData);
          this.$parent.load();
          this.$message({
            message: "添加成功",
            type: "success"
          });
          this.resetForm();
        } else {
          let res=await editDirectiveData(this.formData);
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