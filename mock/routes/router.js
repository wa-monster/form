let bodyParser = require('body-parser')
let jsonParser = bodyParser.json();
let routerData = require('../sql/routerData')
let id = 11
module.exports = function (app) {
  app.get('/routerData', (req, res, next) => {
    let { currentPage, pageSize } = req.query
    let list = routerData.slice((currentPage - 1) * pageSize, (currentPage * pageSize))
    return res.json({
      list,
      code: 0,
      total: routerData.length
    })
  })
  app.post('/addRouterData', jsonParser, (req, res, next) => {
    req.body.id = id;
    id++;
    routerData.push(req.body)
    return res.json({
      code: 0,
      message: '添加成功'
    })
  })

  app.post('/delRouterData', jsonParser, (req, res, next) => {
    req.body.forEach(item => {
      routerData = routerData.filter(i => {
        return item !== i.id;
      });
    });
    return res.json({
      code: 0,
      message: '删除成功'
    })
  })

  app.post('/editRouterData', jsonParser, (req, res, next) => {
    routerData.forEach((item) => {
      if (item.id == req.body.id) {
        for (let key in item) {
          item[key] = req.body[key];
        }
      }
    })
    return res.json({
      code: 0,
      message: '修改成功'
    })
  })
}