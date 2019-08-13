var express = require('express')
var User = require('../models/user')
var md5 = require('blueimp-md5')
var router = express.Router()

// 用户注册和登录页面
router.get('/user', function (req, res) {
  res.render('user')
})

// 处理注册请求
router.post('/register', function (req, res) {
  // 1. 判断昵称是否存在
  // 2. 判断邮箱是否存在
  // 3. 存数据
  var body = req.body;
  User.findOne({ username: body.username }, function (err, data) {
    if (err) return res.send(err.message)
    if (data) {
      res.json({
        error: {
          code: 1,
          message: '用户名已存在'
        }
      })
    } else {
      User.findOne({ email: body.email }, function (err, data) {
        if (err) return res.send(err.message)
        if (data) {
          res.json({
            error: {
              code: 2,
              message: '邮箱已被注册'
            }
          })
        } else {
          body.password = md5(md5(body.password))
          new User(body).save(function (err, user) {
            if (err) return res.send(err)
            req.session.user = user
            res.json({
              data: 'ok'
            })
          })
        }
      })
    }
  })
})

// 处理登录请求
router.post('/login', function (req, res) {
  // 1. 查询 nickname 是否存在
  // 2. 密码是否正确
  var body = req.body
  User.findOne({ username: body.username }, function (err, user) {
    if (err) return res.send(err.message)
    if (user) {
      if (user.password === md5(md5(body.password))) {
        req.session.user = user
        res.json({
          data: 'ok'
        })
      } else {
        res.json({
          error: {
            code: 4,
            message: '密码错误'
          }
        })
      }
    } else {
      res.json({
        error: {
          code: 3,
          message: '用户名不存在'
        }
      })
    }
  })
})

// // 处理退出请求
router.get('/logout', function (req, res) {
  req.session.user = null
  res.redirect('/')
})

module.exports = router