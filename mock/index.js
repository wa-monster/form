
let bodyParser = require('body-parser')
let jsonParser = bodyParser.json();
let { datalist } = require('./sql/data')
let directiveData = require('./sql/directiveData')
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

  app.get('/directiveData', (req, res, next) => {
    let { currentPage, pageSize } = req.query
    let list = directiveData.slice((currentPage - 1) * pageSize, (currentPage * pageSize))
    return res.json({
      list,
      code: 0,
      total: directiveData.length
    })
  })

  app.post('/addDirectiveData', jsonParser, (req, res, next) => {
    directiveData.push(req.body)
    return res.json({
      code: 0,
      message: '添加成功'
    })
  })

  app.post('/delDirectiveData', jsonParser, (req, res, next) => {
    req.body.forEach(item => {
      directiveData = directiveData.filter(i => {
        return item !== i.id;
      });
    });
    return res.json({
      code: 0,
      message: '删除成功'
    })
  })
 
  app.post('/editDirectiveData', jsonParser, (req, res, next) => {
    directiveData.forEach((item)=>{
      if(item.id==req.body.id){
        for(let key in item){
          item[key]=req.body[key];
        }
      }
    })
    return res.json({
      code: 0,
      message: '修改成功'
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