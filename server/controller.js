"use strict";

var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var _ = require('lodash');
var uuid = require('uuid');


//mongodb
var connection_string = 'mongodb://127.0.0.1:27017/test';
var db = mongoose.connect(connection_string, ['test']);
autoIncrement.initialize(db);

// mongoose setup for "Record" model
var RecordSchema = new mongoose.Schema({
  record: String,
  date: Date,
  seq: {type: Number, default: 0},
  someid: {type: String, default: uuid.v4}
});
RecordSchema.plugin(autoIncrement.plugin, {model: 'Record', field: 'recordId'});
mongoose.model('Record', RecordSchema);
var Record = mongoose.model('Record');


// save a record
module.exports.createRecord = function (req, res, next) {
  var jsonBody = JSON.parse(req.body);
  var record = jsonBody.record;
  var recordObject = new Record({
    record: record,
    date: new Date(),
    someid: generateRandomCode()
  });
  recordObject.save(function (error, object) {
    if (error) {
      console.error(error);
      res.status(500).send({'result': "error", 'status': 'failure'});
    }
    console.log("saved");
    //res.send({'result': calculateShortCodeFromId(object.recordId), 'status': 'success'});
    res.send({'result': object.someid, 'status': 'success'});
  });
  return next();
};

// list all records
module.exports.listRecord = function (req, res, next) {
  Record.find({}, function (error, result) {
    if (error) {
      console.log(error);
      return res.status(500).send();
    } else {
      console.log(result);
      return res.send({'result': result});
    }
  });
  return next();
};

// get a record by id
module.exports.getRecord = function (req, res, next) {
  //var recordId = calculateIdFromShortCode(req.params.shortCode);
  //Record.find({recordId: recordId}, function (error, record) {
  Record.find({someid: req.params.shortCode}, function (error, record) {
    if (error) {
      console.log(error);
      res.status(500).send({'result': "error", 'status': 'failure'});
    } else {
      if (record.length>0){
        console.log(record);
        return res.send({'result': record[0].record, 'status': 'success'});
      }else{
        res.status(500).send({'result': "Item not found!", 'status': 'failure'});
      }
    }
  });
};

function generateRandomCode(){
  //TODO: generate a no-collision random 4-character length code
  return uuid.v4();
}