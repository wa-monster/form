module.exports = function(app){
  app.get('/aa',(req,res,next)=>{
    return res.json({
      a:''
    })
  })
}