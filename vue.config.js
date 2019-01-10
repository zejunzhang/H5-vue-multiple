const path = require('path')
const glob = require('glob')
/** 获取多页的入口脚本和模板 */
const getPages = (() => {
  const [
    globPathHtml,
    globPathJs,
    pages,
    tempSet
  ] = [
    ['./src/pages/**/*.html', 'template'], // 入口模板正则
    ['./src/pages/**/*.js', 'entry'], // 入口脚本正则
    Object.create(null),
    new Set()
  ]
  const getMultiPageConf = (globPath, keyName) => {
    let [fileList, tempArr, modName] = [glob.sync(globPath), [], null]
    if (fileList.length !== 0) {
      for (let entry of fileList) {
        tempArr = path.dirname(entry, path.extname(entry)).split('/')
        modName = tempArr[tempArr.length - 1]
        if (tempSet.has(modName)) {
          Object.assign(pages[modName], { [keyName]: entry, 'filename': `${modName}.html` })
        } else {
          Reflect.set(pages, modName, { [keyName]: entry }) && tempSet.add(modName)
        }
      }
      return true
    } else {
      if (keyName === 'template') {
        throw new Error('无法获取多页入口模板')
      } else if (keyName === 'entry') {
        throw new Error('无法获取多页入口脚本')
      } else {
        throw new Error('无法获取多页信息')
      }
    }
  }
  try {
    while (getMultiPageConf(...globPathHtml) && getMultiPageConf(...globPathJs)) return pages
  } catch (err) {
    console.log('获取多页数据错误：', err)
  }
})()


let url = 'https://api.douban.com/v2/';
module.exports = {
    baseUrl: '',
    // baseUrl: process.env.NODE_ENV === 'production' ? '/' : '/', //相對於根目錄的目錄
    // output: {
    //     path: __dirname+'../dist',
    //     filename: '[name].js',
    // },
    configureWebpack: config => {
        config;
        if (process.env.NODE_ENV === 'production') {
            url = 'https://api.douban.com/v2/'
        } else {
            url = 'https://api.douban.com/v2/'
        }
      },
    pages: getPages,
    devServer: {
        port: 8080, // 端口号
        host: '0.0.0.0',
        https: false, // https:{type:Boolean}
        open: true, //配置自动启动浏览器
        proxy: {
            '/api': {
                target: url,   // 需要请求的地址
                changeOrigin: true,  // 是否跨域
                ws:true,
                pathRewrite: {
                    '^/api': ''  // 替换target中的请求地址，也就是说，在请求的时候，url用'/api'代替'https://api.douban.com/v2/'
                }
            }
        }
        }, 
    css: undefined,
    lintOnSave: false,//不开启eslint检测
    outputDir: undefined,   // 构建输出目录
    assetsDir: undefined,  // 静态资源目录 (js, css, img, fonts)
    runtimeCompiler: true, //包含运行时编译器的 Vue 构建版本
    productionSourceMap: false, // 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度
    parallel: undefined,  // 构建时开启多进程处理babel编译
    chainWebpack: config => {
      config.module
          .rule('images')
          .use('url-loader')
          .loader('url-loader')
          .tap(options => {
              // 修改它的选项...
              options.limit = 10000
              return options
          })
  }
}

