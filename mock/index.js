
//数据源设置接口
let origin=require('./routes/origin')
//样式设置接口
let style = require('./routes/style')
//自动生成器接口
let auto = require('./routes/auto')
//表单库接口
let form = require('./routes/form')
let directive=require('./routes/directive')

let router=require('./routes/router')
let server=require('./routes/server')
let page=require('./routes/page')
let menu=require('./routes/menu')
module.exports = function (app) {
  origin(app);
  style(app);
  auto(app);
  form(app);
  directive(app);
  router(app);
  server(app);
  page(app);
  menu(app);
}