const { defineConfig } = require('@vue/cli-service')
// const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
module.exports = defineConfig({
  transpileDependencies: true,
  // configureWebpack: {
  //   plugins: [new NodePolyfillPlugin()],
  // },
  devServer: {
    host: 'localhost',
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://mall-pre.springboot.cn',
        changeOrigin: true,
        pathRewrite: {
          '/api': ''
        }
      }
    }
  },
  indexPath: 'cmqMall.html',
  chainWebpack: config => {
    config.plugins.delete('prefetch')
  }
})
