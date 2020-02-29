/** vue cli3.x 配置文件 */

// gzip
const CompressionPlugin = require('compression-webpack-plugin')
// Webpack包文件分析器
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  //  项目路径
  publicPath: process.env.NODE_ENV === 'pro' ? '/' : '',
  // 输出文件目录
  outputDir: 'dist',
  // 放置生成的静态资源目录,相对于outputDir
  assetsDir: 'assets',
  // 是否在构建生产包时生成 sourceMap 文件
  productionSourceMap: false,
  // 文件名哈希
  filenameHashing: false,
  // 代码保存时进行eslint检测
  lintOnSave: true,
  // 开发环境配置
  devServer: {
    host: 'localhost',
    port: 8080,
    https: false,
    // 自动启动浏览器
    open: true,
    // 热更新
    hotOnly: true
  },
  // 调整 webpack 配置
  configureWebpack: config => {
    // 生产环境
    const pluginsPro = [
      // 文件开启Gzip
      new CompressionPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
        threshold: 8192,
        minRatio: 0.8
      }),
      // Webpack包文件分析器
      new BundleAnalyzerPlugin()
    ]
    // 开发环境
    const pluginsDev = []
    // 根据当前环境选择配置
    if (process.env.NODE_ENV === 'pro') {
      config.plugins = [...config.plugins, ...pluginsPro]
    } else {
      config.plugins = [...config.plugins, ...pluginsDev]
    }
  }
}
