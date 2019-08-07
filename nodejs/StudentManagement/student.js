var fs = require('fs')
var dbPath = 'db.json'

/**
 * 获取所有学生信息
 * @param {function} callback
 * @callback err, students => Error, Array
 */
exports.getAllStudents = function (callback) {
  fs.readFile(dbPath, function (err, data) {
    if (err) return callback(err)
    data = JSON.parse(data.toString())
    return callback(null, data)
  })
}

/**
 * 通过学生id值获取学生信息和它所在索引
 * @param id 学生id
 * @param {function} callback
 * @callback err, student, index => Error, Object, Number
 */
exports.getStudentById = function (id, callback) {
  exports.getAllStudents(function (err, students) {
    if (err) return callback(err)
    students.forEach(function (obj, index) {
      if (obj.id === parseInt(id)) {
        return callback(null, students[index], index)
      }
    })
  })
}

/**
 * 新增学生信息并存储
 * @param {Object} data
 * @param {function} callback
 * @callback err => Error
 */
exports.addStudent = function (data, callback) {
  exports.getAllStudents(function (err, students) {
    if (err) return callback(err)
    data.id = students[students.length - 1].id + 1
    students.push(data)
    exports.save(students, function (err) {
      if (err) return callback(err)
      return callback(null)
    })
  })
}

/**
 * 存储所有学生信息
 * @param {Object} students
 * @param {function} callback
 * @callback err => Error
 */
exports.save = function (students, callback) {
  students = JSON.stringify(students)
  fs.writeFile(dbPath, students, function (err) {
    if (err) return callback(err)
    return callback(null)
  })
}