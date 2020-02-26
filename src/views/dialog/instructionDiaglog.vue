<template>
  <el-dialog :title="title" v-if="visible" :visible.sync="visible" :before-close="resetForm">
    <el-form
      :model="formData"
      label-position="left"
      :label-width="formLabelWidth"
      size="mini"
      :rules="instructionFormRule"
      class="sec-form"
      ref="formData"
    >
      <el-form-item label="指令名称" prop="name">
        <el-input v-model="formData.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="指令代码" prop="code">
        <el-input v-model="formData.code" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="功能描述" prop="fn">
        <el-input v-model="formData.fn" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-radio-group v-model="formData.type">
          <el-radio :label="0">mysql</el-radio>
          <el-radio :label="1">postgres</el-radio>
          <el-radio :label="2">oracle</el-radio>
          <el-radio :label="3">mongodb</el-radio>
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
            :rules="childFormRule"
            ref="childForm"
            size="mini"
            :model="formData.params[index]"
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
  </el-dialog>
</template>
<script>
export default {
  name: "instructionDiaglog",
  props: {
    title: {
      type: String
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
      required: true
    }
  },
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
        //   label:[
        //       { required: true, message: "label不能为空", trigger: "blur" }
        //   ]
      },
      id:1,
    };
  },
  methods: {
    depClone(data) {
      return JSON.parse(JSON.stringify(data));
    },
    resetForm() {
      this.$refs["formData"].resetFields();
      this.$refs["childForm"].forEach(item => {
        item.resetFields();
      });
      let state=false;
      this.$emit("changeSate",state,this.type)
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
          this.$parent.instructionForm.id = this.id;
          this.$parent.instructionData.push(
            this.depClone(this.formData)
          );
          this.id++;
          this.$message({
            message: "添加成功",
            type: "success"
          });
          this.$parent.addDialogVisible = false;
        }else{
           this.$parent.instructionData.forEach((item)=>{
               if(item.id==this.formData.id){
                   for(let key in item){
                       if(key!=="id"){
                         item[key]=this.formData[key];
                       }
                   }
               }
           })
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