import { Debounce } from '@/util/util'
export default {
  data(){
    return {
      page:{
        currentPage: 1,
        total:10,
        pageSize:10,
        keywords:''
      },
      debounceFn:null,
    }
  },
  created(){
    this.debounceFn=Debounce(this.load, 500)
  },
  watch:{
    'page.currentPage'(){
      this.load()
    },
    'page.keywords'(){
      this.debounceFn();
    }
  },
  methods:{
    sizeChange(size){
      this.page.pageSize = size
      this.load()
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
        let res = await fn(params);
        this.$message.success('删除成功')
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