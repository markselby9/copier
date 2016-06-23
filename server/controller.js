"use strict";

var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var _ = require('lodash');
var uuid = require('uuid');
var Set = require("collections/set");
var util = require('util');

//mongodb
var connection_string = 'mongodb://127.0.0.1:27017/test';
var options = {};
var db = mongoose.connect(connection_string, options, function (error) {
  if (error) {
    console.log(error);
    throw "mongodb connect failed, please check.";
  }
});

autoIncrement.initialize(db);


// mongoose setup for "Record" model
var RecordSchema = new mongoose.Schema({
  record: String,
  date: Date,
  seq: {type: Number, default: 0},
  someid: {type: String, default: generateSomeId}
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
    someid: generateSomeId()
  });
  recordObject.save(function (error, object) {
    if (error) {
      console.log(error);
      res.send({'result': "error", 'status': 'failure'});
    }
    console.log("saved");
    //res.send({'result': calculateShortCodeFromId(object.recordId), 'status': 'success'});
    res.send({'result': object.someid, 'status': 'success'});
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
      res.send({'result': "error", 'status': 'failure'});
    } else {
      if (record.length > 0) {
        console.log(record);
        res.send({'result': record[0].record, 'status': 'success'});
      } else {
        res.send({'result': "Item not found!", 'status': 'failure'});
      }
    }
  });
  return next();
};

module.exports.removeRecord = function (req, res, next) {
  var shortCode = req.params.shortCode;
  Record.find({someid: shortCode}, function(error, record){
    if (error){
      console.log(error);
      res.send({'result': "error", 'status': 'failure'});
      return next();
    }
    else if (record.length == 0) {
      res.send({'result': "Item not found!", 'status': 'failure'});
      return next();
    }
    else{
      Record.remove({someid: shortCode}, function(err){
        if (!err){
          res.send({result:"Deleted!", status:"success"});
        }else{
          res.send({result:"error", status:"failure"});
        }
      });
      return next();
    }
  });
};


var CodeLength = 3;
var idset = new Set();

var generate = function () {
  var fresh = uuid.v4();
  var n = fresh.length;
  var begin = n - CodeLength;
  return fresh.substring(begin, n);
};


var generateSomeId = function () {
  var fresh;
  var attempted = 0;
  while (true) {
    fresh = generate();
    attempted += 1;
    if (!idset.has(fresh)) break;
    if (attempted == 100) throw "Collided 100 times!";
  }
  idset.add(fresh);
  return fresh;

};


var init = function () {
  var query = Record.find({}).select("someid");

  return query.exec().onResolve(function (err, ids) {
    if (err) throw "Failed to fetch data from database...Please check mongodb";
    console.log("Init data for idset arrived.");
    console.log(util.format("#Entries=%d", ids.length));
    for (var id in ids) {
      idset.add(id);
    }
  });

};


module.exports.init = init;

function generateRandomCode() {
  //TODO: generate a no-collision random 4-character length record_code
  return uuid.v4();
}
