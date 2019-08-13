function ajax(method, url, data, callback) {
  var xhr = new XMLHttpRequest()
  xhr.open(method, url, true)
  xhr.onload = function () {
    var responseJson = JSON.parse(xhr.responseText)
    callback(responseJson)
  }
  if (method === 'get') {
    xhr.send()
  } else {
    var params = JSON.stringify(data)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(params)
  }
}