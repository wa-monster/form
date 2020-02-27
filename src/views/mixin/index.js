export default {
  data(){
    return {
      page:{
        currentPage: 1,
        total:10,
        pageSize:10
      }

    }
  },
  watch:{
    'page.currentPage'(){
      this.load()
    }
  },
  methods:{
    sizeChange(size){
      this.page.pageSize = size
      this.load()
    },
    currentChange(currentPage){
      this.page.currentPage = currentPage
      this.load()
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
        data.forEach((i, index) => {
          if (item.id === i.id) {
            data.splice(index, 1);
          }
        });
        if (data.length === 0) {
          if (this.page.currentPage > 1) {
            this.page.currentPage--;
          }
        }
      } catch (err) {
        throw err;
      }
    },
  }
}