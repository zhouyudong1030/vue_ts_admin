const path = require('path')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')

const devServePort = 9527
const mockServePort = 9528
const name = 'Vue Typescript Admination'
const smp = new SpeedMeasurePlugin()

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/vue_ts_admin/' : '/',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: devServePort,
    open: true,
    overlay: { // 浏览器打开页面显示终端编译错误 require.ensure
      warnings: false,
      errors: true
    },
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: `http://localhost:${mockServePort}/mock-api/v1`,
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    }
  },
  pluginOptions: { // 全局导入样式文件
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, 'src/style/_variable.scss'),
        path.resolve(__dirname, 'src/style/_mixins.scss')
      ]
    }
  }
}
