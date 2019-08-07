var fs = require('fs')

/**
 * 渲染主页面的students表格
 * @param filePath
 * @param {Array} students
 * @param {function} callback
 */
function renderIndex (filePath, students, callback) {
  // 1. 取出需要循环的<tr>标签部分
  // 2. 根据 students 数组渲染
  fs.readFile(filePath, function (err, html) {
    if (err) return callback(err)
    html = html.toString()

    var start = html.indexOf('<tr class="data">')
    var end = html.indexOf('</tr>', start) + '</tr>'.length
    var content = html.slice(start, end)

    var newContent = ''
    var len = students.length
    for (var i = 0; i < len; i++) {
      var current = content
      Object.keys(students[i]).forEach(function (key) {
        current = current.replace(key, students[i][key])
      })
      // 两处id
      current = current.replace('id', students[i].id)
      newContent += current
    }
    var rendered = html.replace(content, newContent)
    return callback(err, rendered)
  })
}

/**
 * 渲染修改界面的学生信息
 * @param filePath
 * @param {Object} student
 * @param {function} callback
 */
function renderModify (filePath, student, callback) {
  fs.readFile(filePath, function (err, html) {
    if (err) return callback(err)
    html = html.toString()

    Object.keys(student).forEach(function (key) {
      html = html.replace('$' + key, student[key])
    })
    return callback(null, html)
  })
}

module.exports = function (filePath, options, callback) {
  if (options.students) {
    renderIndex(filePath, options.students, function (err, rendered) {
      if (err) return callback(err)
      return callback(null, rendered)
    })
  } else if (options.student) {
    renderModify(filePath, options.student, function (err, rendered) {
      if (err) return callback(err)
      return callback(null, rendered)
    })
  } else {
    fs.readFile(filePath, function (err, html) {
      if (err) return callback(err)
      return callback(null, html.toString())
    })
  }
}