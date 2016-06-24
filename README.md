It's a practice project for React.js, node.js and mongodb. 

##What's this

I'm trying to make a simple copy & paste tool between different devices, so that people can easily copy something into here, 

+ submit it and get a short code
+ then get the sentence on other device or by another person.

##Usage

Temporarily, we use "nodemon" to run the server scripts. 

+ Please make sure you have mongodb installed and running, then run "npm install" to install the npm dependencies, then "npm start" to run the server program.
+ Then use any browser to open "client/index.html" to open the client-side page and use copier. (may be changed later)

##Server API

+ POST /record      => Save a record and get a short code
+ GET /record/:code => Get the record by the code
+ GET /record/remove/:code =>   Remove the record by code
 
##TODO:

+ Other format of input?
+ Add support for little files