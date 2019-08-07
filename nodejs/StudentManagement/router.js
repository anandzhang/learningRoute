var express = require('express')
var student = require('./student')
var router = express.Router()

// 主页
router.get('/', function (req, res) {
  student.getAllStudents(function (err, data) {
    if (err) return res.status(500).send('Server Error')
    res.render('index', {
      students: data
    })
  })
})

// 添加学生信息页面
router.get('/add', function (req, res) {
  res.render('add')
})

// 修改学生信息页面
router.get('/modify/:id', function (req, res) {
  // 1. 找出要修改的学生信息
  // 2. 传给模板函数渲染
  student.getStudentById(req.params.id, function (err, data) {
    if (err) return res.status(500).send('Server Error')
    res.render('modify', {
      student: data
    })
  })
})

// 处理添加请求
router.get('/data/add', function (req, res) {
  student.addStudent(req.query, function (err) {
    if (err) return res.status(500).send('Server Error')
    res.redirect('/')
  })
})

// 处理删除请求
router.get('/data/delete/:id', function (req, res) {
  // 1. 获取所有学生信息
  // 2. 通过id找到学生数组中索引
  // 3. 删除
  // 4. 储存新的所有学生信息
  student.getAllStudents(function (err, students) {
    student.getStudentById(req.params.id, function (err, data, index) {
      // 根据索引删除学生信息
      students.splice(index, 1)
      student.save(students, function (err) {
        if (err) return res.status(500).send('Server Error')
        res.redirect('/')
      })
    })
  })
})

// 处理修改请求
router.get('/data/modify', function (req, res) {
  // 1. 获取所有学生信息
  // 2. 通过id获取学生索引
  // 3. 更新学生信息
  // 4. 储存新的所有学生信息
  student.getAllStudents(function (err, students) {
    student.getStudentById(req.query.id, function (err, data, index) {
      req.query.id = parseInt(req.query.id)
      Object.keys(students[index]).forEach(function (key) {
        students[index][key] = req.query[key]
      })
      student.save(students, function (err) {
        if (err) return res.status(500).send('Server Error')
        res.redirect('/')
      })
    })
  })
})

module.exports = router