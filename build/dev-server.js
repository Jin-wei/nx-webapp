const path = require('path')
const express = require('express')
const webpack = require('webpack')
const proxyMiddleware = require('http-proxy-middleware')
const config = require('./webpack.dev.conf')
const favicon = require('express-favicon')

const app = express()
const compiler = webpack(config)

let proxyTable
if (process.env.NODE_ENV === 'test') {
    proxyTable = {
       '/api': 'http://106.15.34.94',
       '/temp': 'http://106.15.34.94',
       '/files': 'http://106.15.34.94'
   }
   //   proxyTable = {
   //       '/api': 'http://192.168.1.102:9090',
   //       '/temp': 'http://192.168.1.102:9090',
   //       '/files': 'http://192.168.1.102:9090'
   //   }
} else {
    proxyTable = {
       '/api': 'http://nxserver:9090',
       '/temp': 'http://nxserver:9090',
       '/files': 'http://nxserver:9090'
   }
}

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
    let options = proxyTable[context]
    if (typeof options === 'string') {
        options = {
            target: options,
            // changeOrigin: true
        }
    }
    app.use(proxyMiddleware(context, options))
})

// 设置资源目录
app.use('/static', express.static(path.join(__dirname, '../public/static')))

app.use(favicon(path.join(__dirname, '../favicon.ico')))
// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}))

// enable hot-reload and state-preserving
// compilation error display
app.use(require('webpack-hot-middleware')(compiler))

app.listen(8000, '0.0.0.0', function (err) {
    if (err) {
        console.log(err)
        return
    }
    console.log('Listening at http://127.0.0.1:8000')
})
