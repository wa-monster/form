<template>
  <el-tooltip
    class="item"
    effect="dark"
    :content="text"
    placement="top"
    :open-delay="400"
  >
    <span class="tooltip_text">{{ text }}</span>
  </el-tooltip>
</template>

<script>
export default {
    name:'Tooltip',
    props:{
      text:{
        type:String,
        default:''
      }
    },
    data() {
        return {

        };
    },
    created() {

    },
    mounted() {

    },
    methods: {

    }
};
</script>

<style scoped lang="stylus">
.tooltip_text{
  display block;
  width: 100%;
  text-align:center;
  text-overflow:ellipsis;
  overflow: hidden;
  white-space :nowrap;
}
</style>
