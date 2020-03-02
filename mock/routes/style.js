let bodyParser = require('body-parser')
let jsonParser = bodyParser.json();
let { formList } = require('../sql/form')
module.exports = function (app) {
  //获取列表
  app.get('/addStyle', (req, res, next) => {
    return res.json({
      code: 0,
    })
  })
  app.get('/activeStyle',(req, res, next)=>{
    return res.json({
      code: 0,
    })
  })
}