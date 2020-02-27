
let directive=require('./routes/directive')
let data=require('./routes/data')
let router=require('./routes/router')
module.exports = function (app) {
  directive(app);
  data(app);
  router(app);
}