let  {datalist}  =  require('./data')

module.exports = function(app){
  /*
  *数据源列表
  */
  //获取列表
  app.get('/datalist',(req,res,next)=>{
    let {currentPage,pageSize} = req.query
    let list = datalist.slice((currentPage-1)*pageSize,(currentPage*pageSize))
    return res.json({
      list,
      code:0,
      total:datalist.length
    })
  })
  //增加列表
  app.post('/addData',(req,res,next)=>{
    return res.json({
      code:0,
    })
  })
  //编辑列表
  app.post('/editData',(req,res)=>{
    return res.json({
      code:0,
    })
  })
}