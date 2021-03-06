export default {
  data(){
    return {
      page:{
        currentPage: 1,
        total:10,
        pageSize:10,
        keywords:'',
      },
      loading:true
    }
  },
  watch:{
    'page.currentPage'(){
      this.onload()
    },
  },
  methods:{
    async onload(){
      this.loading = true
      await this.load()
      this.loading = false
    },
    sizeChange(size){
      this.page.pageSize = size
      this.onload()
    },
    currentChange(currentPage){
      this.page.currentPage = currentPage
    },
    async delete(data, item,fn) {
      try {
        let params;
        if(Array.isArray(item)){
          params=item.map((item)=>{
            return item.id;
          })
        }else{
          params=[];
          params.push(item.id);
        }
        let res = await fn(params)
        this.$message({
          message:'删除成功',
          type: 'success',
          duration:'2000'
        })
        if (data.length === 1) {
          if (this.page.currentPage > 1) {
            this.page.currentPage--;
          }else{
            this.load()
          }
        }else{
          this.load();
        }
      } catch (err) {
        throw err;
      }
    },
  }
}