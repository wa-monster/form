
//数据源设置接口
let origin=require('./routes/origin')
//自动生成器接口
let auto = require('./routes/auto')
//表单库接口
let form = require('./routes/form')
let directive=require('./routes/directive')

let router=require('./routes/router')
module.exports = function (app) {
  origin(app);
  auto(app);
  form(app);
  directive(app);
  router(app);
}