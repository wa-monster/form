const path = require('path');

const resolve = (dir) => path.join(__dirname, dir);

module.exports = {
  productionSourceMap: false,
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
  },
  devServer: {
    // proxy: 'http://localhost:3000',
    port: 8000,
    before: require('./mock/index'),

  },
};
