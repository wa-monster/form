let bodyParser = require('body-parser')
let jsonParser = bodyParser.json();
let pageData = require('../sql/pageData')
let id = 11
module.exports = function (app) {
  app.get('/PageData', (req, res, next) => {
    let { currentPage, pageSize } = req.query
    let list = pageData.slice((currentPage - 1) * pageSize, (currentPage * pageSize))
    return res.json({
      list,
      code: 0,
      total: pageData.length
    })
  })
  app.post('/addPageData', jsonParser, (req, res, next) => {
    req.body.id = id;
    id++;
    pageData.push(req.body)
    return res.json({
      code: 0,
      message: '添加成功'
    })
  })

  app.post('/delPageData', jsonParser, (req, res, next) => {
    req.body.forEach(item => {
      pageData = pageData.filter(i => {
        return item !== i.id;
      });
    });
    return res.json({
      code: 0,
      message: '删除成功'
    })
  })

  app.post('/editPageData', jsonParser, (req, res, next) => {
    pageData.forEach((item) => {
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