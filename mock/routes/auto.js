let bodyParser = require('body-parser')
let jsonParser = bodyParser.json();
let { autoList } = require('../sql/auto')
module.exports = function (app) {
  //获取列表
  app.get('/getAutoList', (req, res, next) => {
    let { currentPage, pageSize,keywords } = req.query
    let autoListClone 
    if(keywords){
      autoListClone = autoList.filter(item=>{
        return item.origin.includes(keywords)
      })
    }else{
      autoListClone = [...autoList] 
    }
    let list = autoListClone.slice((currentPage - 1) * pageSize, (currentPage * pageSize))
    setTimeout(()=>{
      return res.json({
        list,
        code: 0,
        total: autoList.length
      })
    },3000)
 
  })
  app.get('/createAutoList', (req, res, next) => {
    return res.json({
      code: 0,
    })
  })
}