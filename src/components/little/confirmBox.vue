<template>
  <el-dialog
    title="提示"
    class="confirm_box"
    :visible.sync="visible"
    :close-on-click-modal="false"
    width="400px"
  >
    <slot>
      <span class="el-icon-warning"></span> 
      {{ text }}
    </slot>
    <div slot="footer">
      <el-button
        size="mini"
        @click="cancel"
      >
        取消
      </el-button>  
      <el-button
        size="mini"
        type="primary"
        :loading="loading"
        @click="sure"
      >
        确认
      </el-button>  
    </div>  
  </el-dialog>
</template>

<script>
export default {
    name:'',
    data() {
        return {
          text:'',
          loading:false,
          visible:false,
          instance:null,
        };
    },
    created() {
    },
    mounted() {

    },
    methods: {
      sure(){
        this.loading = true
        let res = new Promise((resolve,reject)=>{
          this.instance.resolve(resolve)
          // resolve()
        })
        res.then(()=>{
          this.loading = false
          this.visible = false
        })
        
      },
      cancel(){
        this.instance.reject()
        this.visible = false
      },
      comfirm(str){
        this.text = str
        this.visible = true
        return new Promise((resolve,reject)=>{
          this.instance = {
            resolve,
            reject
          }
        })
      }
    }
};
</script>

<style scoped lang="stylus">

.el-icon-warning{
  color: #E6A23C;
  font-size:18px;
}
</style>
<style lang="stylus">
.confirm_box .el-dialog__body{
  padding: 15px 20px;
}
</style>