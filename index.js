'use strict'

var toAnsible = require('./generators/ansible.js')
var toDart = require('./generators/dart.js')
var toGo = require('./generators/go.js')
var toJsonString = require('./generators/json.js')
var toNode = require('./generators/node.js')
var toPhp = require('./generators/php.js')
var toPython = require('./generators/python.js')
var toR = require('./generators/r.js')
var toRust = require('./generators/rust.js')
var toStrest = require('./generators/strest.js')
var toJquery = require('./generators/jquery.js')
//var toRuby = require('./generators/ruby.js')

module.exports = {
  toAnsible: toAnsible,
  toDart: toDart,
  toGo: toGo,
  toJsonString: toJsonString,
  toNode: toNode,
  toPhp: toPhp,
  toPython: toPython,
  toR: toR,
  toRust: toRust,
  toStrest: toStrest,
  toJquery: toJquery //,
  //toRuby: toRuby 
}
