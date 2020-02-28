let bodyParser = require('body-parser')
let jsonParser = bodyParser.json();
let { formList } = require('../sql/form')
module.exports = function (app) {
  //获取列表
  app.get('/getFormList', (req, res, next) => {
    let { currentPage, pageSize } = req.query
    let list = formList.slice((currentPage - 1) * pageSize, (currentPage * pageSize))
    return res.json({
      list,
      code: 0,
      total: formList.length
    })
  })
}