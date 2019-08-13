// 注册与登录表单的切换
var btnSwitch = document.getElementsByClassName('btn-switch')
var sign = document.getElementsByClassName('sign')
var more = document.getElementsByClassName('more')[0]
btnSwitch[0].onclick = function () {
  sign[0].className = 'sign  active'
  sign[1].className = 'sign'
  more.style.animation = 'toLeft 1s forwards'
}
btnSwitch[1].onclick = function () {
  sign[0].className = 'sign'
  sign[1].className = 'sign active'
  more.style.animation = 'toRight 1s forwards'
}

// 处理注册表单数据和请求响应
var register = document.forms['sign-up']
register.onsubmit = function (e) {
  e.preventDefault()
  var params = {
    username: register.username.value,
    email: register.email.value,
    password: register.password.value
  }
  ajax('post', '/register', params, function (res) {
    if (res.data) {
      window.location.href = '/'
    } else {
      alert(res.error.message)
    }
  })
}

// 处理登录表单数据和请求响应
var login = document.forms['sign-in']
login.onsubmit = function (e) {
  e.preventDefault()
  var params = {
    username: login.username.value,
    password: login.password.value
  }
  ajax('post', '/login', params, function (res) {
    if (res.data) {
      window.location.href = '/'
    } else {
      alert(res.error.message)
    }
  })
}