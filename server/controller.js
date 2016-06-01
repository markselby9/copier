var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');


//mongodb
var connection_string = 'mongodb://127.0.0.1:27017/test';
db = mongoose.connect(connection_string, ['test']);
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
    res.send({'result': object, 'status': 'success'});
  });
  return next();
};

module.exports.listRecord = function (req, res, next) {
  Record.find({}, function (error, result) {
    if (error) {
      console.error(error);
      return res.send(400);
    } else {
      return res.send({'result': result});
    }
  });
  return next();
};
