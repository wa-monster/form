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
    }
  }
}