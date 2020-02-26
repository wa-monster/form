let  {datalist}  =  require('./data')

module.exports = function(app){
  //数据源列表

  app.get('/datalist',(req,res,next)=>{
    let {currentPage,pageSize} = req.query
    let list = datalist.slice((currentPage-1)*pageSize,(currentPage*pageSize))
    return res.json({
      list,
      code:0,
      total:datalist.length
    })
  })
}