let bodyParser = require('body-parser')
let jsonParser = bodyParser.json();
let { formList } = require('../sql/form')
module.exports = function (app) {
  //获取列表
  app.get('/getFormList', (req, res, next) => {
    let { currentPage, pageSize, keywords } = req.query
    let formListClone 
    if(keywords){
      formListClone = formList.filter(item=>{
        return item.name.includes(keywords)
      })
    }else{
      formListClone = [...formList] 
    }
    let list = formListClone.slice((currentPage - 1) * pageSize, (currentPage * pageSize))
    setTimeout(()=>{
      return res.json({
        list,
        code: 0,
        total: formList.length
      })
    },3000)
  })
  app.post('/deleteFormList',jsonParser,(req, res, next)=>{
    let body = req.body
    formList = formList.filter(item=>{
      let isId = body.some(id=>{
        return id === item.id
      })
      return !isId
    })
    return res.json({
      code: 0,
    })
  })
}