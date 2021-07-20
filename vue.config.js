const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin')

// 转为CND外链方式的npm包
const externals = {
  'axios': 'axios',
  'vue': 'Vue',
  'vue-router': 'VueRouter',
  'vuex': 'Vuex',
  'element-ui': 'ELEMENT'
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
      'https://cdn.jsdelivr.net/npm/axios@0.21.1/dist/axios.min.js',
      'https://cdn.jsdelivr.net/npm/element-ui@2.15.3/lib/index.min.js'
    ]
  }
}
// 是否使用gzip
const productionGzip = true
// 需要gzip压缩的文件后缀
const productionGzipExtensions = ['js', 'css']

module.exports = {
  // 所有资源指定一个基础路径
  publicPath: '/',
  // 设为false打包时不生成.map文件
  productionSourceMap: true,
  // 打包生成的静态资源目录
  outputDir: 'dist',
  // 是否使用eslint,设置为true
  lintOnSave: process.env.NODE_ENV === 'development',
  // 开发服务器设置
  devServer: {
    open: true,
    // 配置代理
    proxy: {
      '/prefix': {
        target: 'http://localhost:8080',
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
      // 生产环境npm包转CDN
      myConfig.externals = externals
      myConfig.plugins = []
      // 构建时开启gzip，服务器也要相应开启gzip
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
      // 关闭host check，方便使用ngrok之类的内网转发工具
      myConfig.devServer = {
        disableHostCheck: true
      }
    }
    return myConfig
  },
  // IE9 10页面空白不显示问题
  // transpileDependencies: ['webpack-dev-server/client'],
  chainWebpack: (config) => {
    // 修复HMR
    config.resolve.symlinks(true)
    // config.entry.app = ['babel-polyfill', './src/main.js']
    config.resolve.alias
      .set('@', path.join(__dirname, 'src'))

    // svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(path.join(__dirname, 'src/assets/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(path.join(__dirname, 'src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    // 添加CDN参数到htmlWebpackPlugin配置中
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
        // 向全局sass样式传入共享的全局变量
        // 详情: https://cli.vuejs.org/guide/css.html#passing-options-to-pre-processor-loaders
        prependData: `
        @import "@/assets/styles/global.scss";
        @import "@/assets/styles/mix.scss";
        `
      }
    }
  }
}
