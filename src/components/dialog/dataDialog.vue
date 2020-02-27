<template>
  <el-dialog
    :title="titleName"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    width="500"
  >
    <el-form
      ref="dataForm"
      :model="formData"
      :rules="rules"
      label-width="90px"
    >
      <el-form-item
        label="名称"
        prop="name"
      >
        <el-input
          v-model="formData.name"
          placeholder="请输入名称"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="描述"
        prop="description"
      >
        <el-input
          v-model="formData.description"
          placeholder="请输入描述"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="简码"
        prop="sign"
      >
        <el-input
          v-model="formData.sign"
          placeholder="请输入简码"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="类型"
        prop="type"
      >
        <el-radio
          v-model="formData.type"
          label="mysql"
        >
        </el-radio>
        <el-radio
          v-model="formData.type"
          label="postgres"
        >
        </el-radio>
        <el-radio
          v-model="formData.type"
          label="oracle"
        >
        </el-radio>
        <el-radio
          v-model="formData.type"
          label="mongodb"
        >
        </el-radio>
      </el-form-item>
      <el-form-item
        label="连接信息"
        prop="info"
      >
        <el-input
          v-model="formData.info"
          placeholder="请输入连接信息"
        ></el-input>
      </el-form-item>
    </el-form>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button
        type="primary"
        @click="submit"
      >确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {addData, editData} from '@/api/base/data'
export default {
    name:'DataDialog',
    data() {
      return {
        dialogVisible: false,
        radio:'',
        titleName:'添加',
        formData:{
          name:'',
          description:'',
          sign:'',
          type:'',
          info:''
        },
        rules:{
          name:[
            {required:true, message: '请输入名称', trigger: 'blur'}
          ],
          description:[
            {required:true, message: '请输入描述', trigger: 'blur'}
          ],
          sign:[
            {required:true, message: '请输入简码', trigger: 'blur'}
          ],
          type:[
            {required:true, message: '请选择类型', trigger: 'change'}
          ],
          info:[
            {required:true, message: '请输入连接信息', trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      //显示
      show(row){
        if(row){
          this.titleName = '修改'
          this.formData = {...row}
        }else{
          this.titleName = '添加'
          this.clearForm()
        }
        this.dialogVisible = true
      },
      //清空表单
      clearForm(){
          this.formData = {
            name:'',
            description:'',
            sign:'',
            type:'',
            info:''
          }
      },
      //提交之前先验证
      submit(){
        this.$refs.dataForm.validate((valid)=>{
          if(valid){
            this.addOrEdit()
          }else{
            return false
          }
        })
      },
      async addOrEdit(){
        try{
          if(this.titleName === '修改'){
            await editData(this.formData)
            this.$message.success('修改成功')
          }else{
            await addData(this.formData)
            this.$message.success('添加成功')
          }
          this.clearForm()
          this.dialogVisible = false
          this.$emit('onload')
        }catch(err){
          throw err
        }
      }
    }
};
</script>

<style scoped lang="stylus">

</style>
