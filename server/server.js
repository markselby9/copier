"use strict";

var restify = require('restify');

var ip_addr = '127.0.0.1';
var port = '8080';


var server = restify.createServer({
  name: "copier-server"
});

server.use(restify.bodyParser({ mapParams: true }));
server.use(restify.queryParser());
server.use(restify.CORS());

server.listen(port, ip_addr, function () {
  console.log("server started at port 8080");
});


var Controller = require('./controller');

Controller.init().then(function(){
    server.get('/record/:shortCode', Controller.getRecord);
    server.post('/record', Controller.createRecord);
});


