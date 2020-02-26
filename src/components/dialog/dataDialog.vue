<template>
  <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    width="500"
  >
    <el-form label-width="90px">
      <el-form-item label="名称：">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="描述：">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="简码：">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="类型：">
        <el-radio
          v-model="radio"
          label="1"
        >
          mysql
        </el-radio>
        <el-radio
          v-model="radio"
          label="2"
        >
          postgres
        </el-radio>
        <el-radio
          v-model="radio"
          label="3"
        >
          oracle
        </el-radio>
        <el-radio
          v-model="radio"
          label="4"
        >
          mongodb
        </el-radio>
      </el-form-item>
      <el-form-item label="连接信息：">
        <el-input></el-input>
      </el-form-item>
    </el-form>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button
        type="primary"
        @click="dialogVisible = false"
      >确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
    name:'DataDialog',
    data() {
      return {
        dialogVisible: false,
        radio:''
      };
    },
    methods: {
      show(){
        this.dialogVisible = true
      }
    }
};
</script>

<style scoped lang="stylus">

</style>
