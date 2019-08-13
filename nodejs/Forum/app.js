var path = require('path')
var express = require('express')
var bodyParser = require('body-parser')
var cookieSession = require('cookie-session')
var app = express()

// 配置模板引擎
app.engine('html', require('express-art-template'))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// 静态资源
app.use(express.static('public'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// 配置 seesion 中间件
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}))

// 加载路由
app.use(require('./routes/index'))
app.use(require('./routes/user'))

app.listen(3000, function () {
  console.log('app listening on 3000')
})