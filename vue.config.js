const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin')

// 转为CND外链方式的npm包
const externals = {
  'axios': 'axios',
  'vue': 'Vue',
  'vue-router': 'VueRouter',
  'vuex': 'Vuex'
}
// CDN外链，会插入到index.html中
const cdn = {
  // 开发环境
  dev: {
    css: [],
    js: []
  },
  // 生产环境
  build: {
    css: [
    ],
    js: [
      'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js',
      'https://cdn.jsdelivr.net/npm/vue-router@3.4.3/dist/vue-router.min.js',
      'https://cdn.jsdelivr.net/npm/vuex@3.5.1/dist/vuex.min.js',
      'https://cdn.jsdelivr.net/npm/axios@0.21.1/dist/axios.min.js'
    ]
  }
}
// 是否使用gzip
const productionGzip = true
// 需要gzip压缩的文件后缀
const productionGzipExtensions = ['js', 'css']

module.exports = {
  // 部署生产环境和开发环境下的URL。
  // 默认情况下，Vue CLI 会假设你的应用是被部署在一个域名的根路径上
  // 例如 https://www.my-app.com/。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 https://www.my-app.com/my-app/，则设置 publicPath 为 /my-app/。
  publicPath: process.env.NODE_ENV === 'production' ? '/dist' : '/',
  // 设为false打包时不生成.map文件
  productionSourceMap: true,
  outputDir: 'dist',
  // 是否使用eslint,设置为true，eslint-loader将发出lint错误作为警告。默认情况下，警告仅记录到终端，并且不会使编译失败。
  lintOnSave: process.env.NODE_ENV !== 'production',

  // 如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
  devServer: {
    open: true,
    // 配置代理
    proxy: {
      '/prefix': {
        target: 'https://localhost:8888', // 接口地址
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/prefix': ''
        }
      }
    }
  },
  configureWebpack: (config) => {
    const myConfig = {}
    if (process.env.NODE_ENV === 'production') {
      // 1. 生产环境npm包转CDN
      myConfig.externals = externals
      myConfig.plugins = []
      // 构建时开启gzip，降低服务器压缩对CPU资源的占用，服务器也要相应开启gzip
      productionGzip && myConfig.plugins.push(
        new CompressionWebpackPlugin({
          test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
          threshold: 10240,
          minRatio: 0.8,
          deleteOriginalAssets: false // 删除源文件
        })
      )
    }
    if (process.env.NODE_ENV === 'development') {
      /**
       * 关闭host check，方便使用ngrok之类的内网转发工具
       */
      myConfig.devServer = {
        disableHostCheck: true
      }
    }
    return myConfig
  },
  transpileDependencies: ['webpack-dev-server/client'],
  chainWebpack: (config) => {
    // 修复HMR
    config.resolve.symlinks(true)
    // config.entry.app = ['babel-polyfill', './src/main.js']
    config.resolve.alias
      .set('@', path.join(__dirname, 'src'))
    /**
     * 添加CDN参数到htmlWebpackPlugin配置中
     */
    config
      .plugin('html')
      .tap(args => {
        if (process.env.NODE_ENV === 'production') {
          args[0].cdn = cdn.build
        }
        if (process.env.NODE_ENV === 'development') {
          args[0].cdn = cdn.dev
        }
        return args
      })
  },
  // 导入全局scss变量
  css: {
    extract: process.env.NODE_ENV === 'production',
    sourceMap: false,
    loaderOptions: {
      scss: {
        // 向全局sass样式传入共享的全局变量, $src可以配置图片cdn前缀
        // 详情: https://cli.vuejs.org/guide/css.html#passing-options-to-pre-processor-loaders
        prependData: `
        @import "@/assets/styles/global.scss";
        `
      }
    }
  }
}
