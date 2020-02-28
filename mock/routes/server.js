let bodyParser = require('body-parser')
let jsonParser = bodyParser.json();
let serverData = require('../sql/serverData')
let id = 11
module.exports = function (app) {
  app.get('/serverData', (req, res, next) => {
    let { currentPage, pageSize,keywords} = req.query
    let currentTotal=serverData.filter((data)=>{
      return !keywords ||data.name.toLowerCase().includes(keywords.toLowerCase())
    });
    let list =currentTotal.slice((currentPage - 1) * pageSize, (currentPage * pageSize))
    return res.json({
      list,
      code: 0,
      total: currentTotal.length
    })
  })
  app.post('/addServerData', jsonParser, (req, res, next) => {
    req.body.id = id;
    id++;
    serverData.push(req.body)
    return res.json({
      code: 0,
      message: '添加成功'
    })
  })

  app.post('/delServerData', jsonParser, (req, res, next) => {
    req.body.forEach(item => {
      serverData = serverData.filter(i => {
        return item !== i.id;
      });
    });
    return res.json({
      code: 0,
      message: '删除成功'
    })
  })

  app.post('/editServerData', jsonParser, (req, res, next) => {
    serverData.forEach((item) => {
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