var fs = require('fs')
var url = require('url')
var http = require('http')
var server = http.createServer()

// 临时数据
var message = [
  {
    name: 'Tom',
    date: '2019.08.01',
    content: '祝你身体健康'
  },
  {
    name: 'Nick',
    date: '2019.08.01',
    content: '万事如意'
  },
  {
    name: 'Yummy',
    date: '2019.08.01',
    content: '年年有余'
  }
]

// 注册 request 请求事件
server.on('request', function (request, response) {
  var oUrl = url.parse(request.url, true)
  var pathName = oUrl.pathname

  if (pathName === '/') {
    // 主页
    fs.readFile('./view/index.html', function (err, data) {
      if (err) throw err
      data = data.toString()
      // 从 index.html 通过字符串截取出 <li></li> liContent
      var start = data.indexOf('<li>')
      var end = data.indexOf('</li>') + '</li>'.length
      var liContent = data.slice(start, end)
      // 模板渲染数据
      data = renderTemplate(data, liContent, message)
      response.end(data)
    })
  } else if (pathName.indexOf('/public/') === 0) {
    // public 可访问的静态资源
    fs.readFile('.' + pathName, function (err, data) {
      if (err) throw err
      response.setHeader('Content-Type', 'text/css')
      response.end(data)
    })
  } else if (pathName === '/post') {
    // 发表留言
    fs.readFile('./view/post.html', function (err, data) {
      if (err) throw err
      response.end(data)
    })
  } else if (pathName === '/submit') {
    // 处理表单数据
    var data = oUrl.query
    data.date = (new Date()).toLocaleString()
    message.unshift(data)
    // 临时重定向
    response.statusCode = 302
    response.setHeader('Location', '/')
    response.end()
  } else {
    response.end('404 Not Found')
  }
})

// 绑定端口号，启动服务器
server.listen(3000, function (err) {
  if (err) throw err
  console.log('server running...')
})

/**
 * Rendering template data
 * Simple rendering without the use of a template engine
 * @param data
 * @param templateStr
 * @param arrData
 * @return {string | void}
 */
function renderTemplate (data, templateStr, arrData) {
  var result = ''
  var len = arrData.length
  for (var i = 0; i < len; i++) {
    var current = templateStr
    Object.keys(arrData[i]).forEach(function (key) {
      current = current.replace('[' + key + ']', arrData[i][key])
    })
    result += current
  }
  return data.replace(templateStr, result)
}