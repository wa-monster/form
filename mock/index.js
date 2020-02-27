
let directive=require('./routes/directive')
let data=require('./routes/data')
let router=require('./routes/router')
let server=require('./routes/server')
module.exports = function (app) {
  directive(app);
  data(app);
  router(app);
  server(app);
}