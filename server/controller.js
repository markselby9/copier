"use strict";

var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var _ = require('lodash');

//mongodb
var connection_string = 'mongodb://127.0.0.1:27017/test';
var db = mongoose.connect(connection_string, ['test']);
autoIncrement.initialize(db);

var RecordSchema = new mongoose.Schema({
  record: String,
  date: Date,
  seq: {type: Number, default: 0}
});
RecordSchema.plugin(autoIncrement.plugin, {model: 'Record', field: 'recordId'});
mongoose.model('Record', RecordSchema);
var Record = mongoose.model('Record');

module.exports.createRecord = function (req, res, next) {
  var jsonBody = JSON.parse(req.body);
  var record = jsonBody.record;
  var recordObject = new Record({
    record: record,
    date: new Date()
  });
  recordObject.save(function (error, object) {
    if (error) {
      console.error(error);
      res.send({'error': error});
    }
    console.log("saved");
    res.send({'result': calculateShortCodeFromId(object.recordId), 'status': 'success'});
  });
  return next();
};


module.exports.listRecord = function (req, res, next) {
  Record.find({}, function (error, result) {
    if (error) {
      console.log(error);
      return res.send(400);
    } else {
      console.log(result);
      return res.send({'result': result});
    }
  });
  return next();
};

module.exports.getRecord = function (req, res, next) {
  var recordId = calculateIdFromShortCode(req.params.shortCode);
  Record.find({recordId: recordId}, function (error, record) {
    if (error) {
      console.log(error);
      return res.send(400);
    } else {
      console.log(record);
      return res.send({'result': record[0].record, 'status':'success'});
    }
  });
};


// calculate a short 4 character code from the auto-incrementing id
function calculateShortCodeFromId(id) {
  let hexString = id.toString(16);
  if (hexString.length < 4) {
    for (let i = 0; i < 4 - hexString.length; i++) {
      hexString = String.fromCharCode(Math.floor(Math.random() * 10 + 103)) + hexString;
    }
  }
  return hexString;
}

function calculateIdFromShortCode(code) {
  var i = 0;
  for (; i < code.length; i++) {
    if (code[i].charCodeAt(0) < 103) {
      break;
    }
  }
  code = code.substr(i);
  return _.parseInt(code, 16);
}