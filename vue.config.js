module.exports = {
  lintOnSave: false,
  productionSourceMap: false,
  chainWebpack: (config) => {
    //忽略的打包文件
    config.externals({
      'vue': 'Vue',
      'vue-router': 'VueRouter',
      'vuex': 'Vuex',
      'axios': 'axios',
      'element-ui': 'ELEMENT',
    })
    const entry = config.entry('app')
    entry
      .add('babel-polyfill')
      .end()
    entry
      .add('classlist-polyfill')
      .end()
    entry
      .add('@/mock')
      .end()
  },
  devServer: {
    port: 1888,
    proxy: {
      '/api': {
        //本地服务接口地址
        // target: 'http://localhost:2888',

        //远程演示服务地址
        //Linux地址:http://114.215.124.220:2888
         target: 'http://59.110.219.114:2788',

        ws: true,
        changeOrigin: true,  //是否跨域
        pathRewrite: {
          '^/api': '/'
        }
      },
      '/weather': {
        target: 'https://free-api.heweather.net',
        ws: true,
        // changeOrigin: true,  //是否跨域
        pathRewrite: {
          '^/weather': '/'
        }
      },
      '/file': {
        target: 'http://47.101.40.188:9000',
        changeOrigin: true,
        pathRewrite: {
          '^/file': ''
        }
      }
    }
  }
}
