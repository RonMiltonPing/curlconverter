var util = require('curlconverter/util')
var jsesc = require('jsesc')

var toJquery = function (curlCommand) {
  var request = util.parseCurlCommand(curlCommand)
  var jqueryCode = ""

  if (request.data) {
    //console.log(typeof(request.data))
    if (typeof(request.data) === "string"){
      var dataproc = request.data.replace(/\n/g, " ")
      dataproc = dataproc.replace(/\s\s+/g, ' ')
      dataproc = dataproc.replace(/({{)?([0-9]?[a-zA-Z]+\!?\??)+(}})?/g, function(str) {return "'" + str + "'"})
      jqueryCode += "var dataObj = " + JSON.stringify(dataproc) + ";\n\n"
    }
  }
  
  jqueryCode += '$.ajax({\n\turl: "' + request.url + '",\n'
  jqueryCode += '\ttype: "' + request.method.toUpperCase() + '",\n'
  jqueryCode += '\tdataType: "json",\n'
  if (request.data) {
    jqueryCode += '\tdata: '
    if (typeof(request.data) === "string"){
      jqueryCode += 'JSON.stringify(dataObj),\n'
    } else {
      jqueryCode += request.data + ',\n'
    }
  }
  if (request.headers) {
    //console.log(Object.keys(request.headers))
    var headerkeys = Object.keys(request.headers)
    var headerCount = Object.keys(request.headers).length
    headerkeys.forEach(function(key, index){
      if (key.toUpperCase() === "CONTENT-TYPE"){
        headerCount -= 1
      }
    })
    headerkeys.forEach(function(key, index){
      //console.log(index + ":" + key)
      if (key.toUpperCase() === "CONTENT-TYPE"){
        //console.log(request.headers[key])
        jqueryCode += '\tcontentType: "' + request.headers[key] + '",\n'
      } else {
        if (headerCount == 1){
          jqueryCode += '\tbeforeSend: function(xhr){xhr.setRequestHeader("' + key + '": "' + request.headers[key] + '")},\n'
        } else {
          console.log('More to process in jquery - ' + key)
        }
        
      }
    })
  }
  jqueryCode += '\tsuccess: function(data){\n\t\tconsole.log("Success: ", data)\n\t},\n'
  jqueryCode += '\terror: function(e){\n\t\tconsole.log("Error: ", e)\n\t}\n'
  return jqueryCode + '});\n'
}

module.exports = toJquery
