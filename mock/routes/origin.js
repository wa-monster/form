let bodyParser = require('body-parser')
let jsonParser = bodyParser.json();
let { datalist } = require('../sql/origin')
module.exports = function (app) {
   /*
  *数据源列表
  */
  //获取列表
  app.get('/datalist', (req, res, next) => {
    let { currentPage, pageSize } = req.query
    let list = datalist.slice((currentPage - 1) * pageSize, (currentPage * pageSize))
    return res.json({
      list,
      code: 0,
      total: datalist.length
    })
  })
 //增加列表
  app.post('/addData',jsonParser,(req,res,next)=>{
    let body = req.body
    body.id = 'd'+(datalist.length+1)
    datalist.push(body)
    return res.json({
      code:0,
    })
  })
  //编辑列表
  app.post('/editData',jsonParser,(req,res)=>{
    let body = req.body
    datalist = datalist.map(item=>{
      if(item.id === body.id){
        return body
      }
      return item
    })
    return res.json({
      code:0,
    })
  })
  //删除列表
  app.post('/deleteData',jsonParser,(req,res)=>{
    let body = req.body
    datalist = datalist.filter(item=>{
      let isId = body.some(id=>{
        return id === item.id
      })
      return !isId
    })
    return res.json({
      code:0,
    })
  })
  //列表生效
  app.post('/activeData',(req,res)=>{
    return res.json({
      code:0,
    })
  })
}