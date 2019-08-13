var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/forum', { useNewUrlParser: true })

var userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('User', userSchema)