let  {datalist}  =  require('./data')

module.exports = function(app){
  //数据源列表
  app.get('/datalist',(req,res,next)=>{
    return res.json({
      datalist,
      code:0
    })
  })
}