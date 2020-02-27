let bodyParser = require('body-parser')
let jsonParser = bodyParser.json();
let { autoList } = require('../sql/auto')
module.exports = function (app) {
  //获取列表
  app.get('/getAutoList', (req, res, next) => {
    let { currentPage, pageSize } = req.query
    let list = autoList.slice((currentPage - 1) * pageSize, (currentPage * pageSize))
    return res.json({
      list,
      code: 0,
      total: autoList.length
    })
  })
}