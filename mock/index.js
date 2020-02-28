
//数据源设置接口
let origin=require('./routes/origin')
//自动生成器接口
let auto = require('./routes/auto')
let directive=require('./routes/directive')

let router=require('./routes/router')
let server=require('./routes/server')
let page=require('./routes/page')
module.exports = function (app) {
  origin(app);
  auto(app);
  directive(app);
  router(app);
  server(app);
  page(app);
}