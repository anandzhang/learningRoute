var express = require('express')
var app = express()

app.engine('html', require('./template'))  // 模板引擎
app.set('view engine', 'html')  // 注册自己的视图引擎

app.use(express.static('public'))  // 静态资源
app.use(require('./router'))  // 路由容器

app.listen(3000, function () {
  console.log('app listening on port 3000!')
})