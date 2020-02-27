
//数据源设置接口
let data=require('./routes/origin')
//自动生成器接口
let auto = require('./routes/auto')
let directive=require('./routes/directive')

module.exports = function (app) {
  data(app);
  auto(app);
  directive(app);
}