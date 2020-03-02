<template>
  <div class="style_box">
    <div class="style_btn">
      <el-button
        size="medium"
        type="primary"
        :loading="addLoading"
        @click="add"
      >
        添加
      </el-button>

      <el-button
        size="medium"
        :loading="activeLoading"
        @click="active"
      >
        生效
      </el-button>
    </div>
    <el-form
      class="style_main"
      :model="formData"
      :rules="rules"
      label-width="70px"
    >
      <el-form-item
        label="主题"
        prop="theme"
      >
        <el-radio
          v-model="formData.theme"
          label="blue"
        >
          蓝色
        </el-radio>
        <el-radio
          v-model="formData.theme"
          label="red"
        >
          红色
        </el-radio>
      </el-form-item>
      <el-form-item
        label="布局"
        prop="layout"
      >
        <el-col
          v-for="(item,index) in list"
          :key="index"
          :span="12"
        >
          <el-radio
            v-model="formData.layout"
            :label="item.val"
          >
            {{ item.name }}
          </el-radio>
          <br>
          <img
            class="layout_img"
            :src="item.url"
            :alt="`${item.name}图片`"
          >
        </el-col>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import left from '@/assets/leftTop.jpg'
import right from '@/assets/rightTop.jpg'
import {addStyle,activeStyle} from '../../api/base/style'

export default {
  name:"Style",
  data(){
    return {
      list:[
        {
          url:left,
          name:'左上布局',
          val:'leftTop'
        },
        {
          url:right,
          name:'右上布局',
          val:'rightTop'
        }
      ],
      formData:{
        theme:'blue',
        layout:'leftTop'
      },
      rules:{
        theme:[
          {required:true,message:'请选择主题',trigger:'cahnge'}
        ],
        layout:[
          {required:true,message:'请选择布局',trigger:'cahnge'}
        ]
      },
      activeLoading:false,
      addLoading:false,
    }
  },
  methods:{
    async add(){
      try{
        this.addLoading = true
        let res = await addStyle()
        this.addLoading = false
      }catch(err){
        throw err
      }
      
      // this.$message( {
      //   message:'删除成功',
      //   type: 'success',
      //   duration:'2000'
      // })
    },
    async active(){
      try{
        this.activeLoading = true
        let res = await activeStyle()
        this.activeLoading = false
        this.$message( {
          message:'生效成功',
          type: 'success',
          duration:'2000'
        })
      }catch(err){
        throw err
      }
    }
  }
}
</script>

<style lang="stylus" scpoed>
.style_box{
  width:100%;
  height:100%;
  position: relative;
  .style_btn{
    margin-bottom:50px;
  }
  .style_main{
    width: 80%;
    margin:0 auto;
  }
}
.layout_img{
  width:320px;
  height:180px; 
}
</style>