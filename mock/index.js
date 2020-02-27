
let directive=require('./routes/directive')
let data=require('./routes/data')
module.exports = function (app) {
  directive(app);
  data(app);
}