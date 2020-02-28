let bodyParser = require('body-parser')
let jsonParser = bodyParser.json();
let menuData = require('../sql/menuData')
let id = 5
function setTree(data){
  data=JSON.parse(JSON.stringify(data));
  return data.filter((father) => {
    let children = data.filter((child) => {
        return child.pId === father.id
    })
    children.length ? father.children = children : ''
    return father.pId === 0
  })
}

function flatTree(data) {
  return data.reduce((prev, next) => {
      if (next.children && next.children.length) {
          prev.push(next)
          let deepObj = deepCopy(next.children)
          delete next.children
          return prev.concat(flatTree(deepObj))
      } else {
          prev.push(next)
          return prev
      }
  }, [])
}
module.exports = function (app) {
  app.get('/menuData', (req, res, next) => {
    let data=setTree(menuData);
    return res.json({
      data,
      code: 0,
    })
  })
  app.post('/addMenuData',jsonParser, (req, res, next) => {
    req.body.id=id;
    req.body.pId=0;
    id++;
    let obj=req.body;
    menuData.push(obj);
    return res.json({
      code: 0,
      message:'添加成功'
    })
  })
}
