var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;




// code zur Verbindung mit der Datenbank
const mongodb = require('mongodb');


function connectMongoDb() {
  // finish this block before the server starts,
  // there are some async tasks inside we need to wait for => declare async so we can use await
  (async () => {

    try {
      // Use connect method to the mongo-client with the mongod-service
      //                      and attach connection and db reference to the app

      // using a local service on the same machine
      //app.locals.dbConnection = await mongodb.MongoClient.connect("mongodb://localhost:27017", {useNewUrlParser: true});

      // using a named service (e.g. a docker container "mongodbservice")
      app.locals.dbConnection = await mongodb.MongoClient.connect("mongodb://mongodbservice:27017", {useNewUrlParser: true});

      app.locals.db = await app.locals.dbConnection.db("itemdb");
      console.log("Using db: " + app.locals.db.databaseName);
    } catch (error) {
      console.dir(error);

      // retry until db-server is up
      setTimeout(connectMongoDb, 3000);
    }

    //mongo.close();

  })();
}

connectMongoDb();

// middleware for making the db connection available via the request object
app.use((req, res, next) => {
  req.db = app.locals.db;
  next();
});





// Items-Router

"use strict";

var express = require('express');
var router = express.Router();


router.post("/",  (req, res, next) => {
  // insert item
  console.log("insert item ");
  console.dir(req.body);
  req.db.collection('item').insertOne(req.body, (error, result) => {
    let responseBody = {};
    if(error){
      console.dir(error);
      responseBody.error = "error";
    } else {
      responseBody._id = result.insertedId;
    }
    //console.dir(result);
    res.json(responseBody);
  });
});

router.get("/",  (req, res, next) => {
  // find item
  console.log("get item " + req.query._id);

  req.db.collection('item').find({_id:new mongodb.ObjectID(req.query._id)}).toArray((error, result) => {
    let responseBody = {};
    if(error){
      console.dir(error);
      responseBody.error = "error";
    } else {
      responseBody = result[0];
    }
    res.json(responseBody);
    //console.dir(result);
  });
});

router.put("/",  (req, res, next) => {
  // update item
  console.log("update item " + req.body._id);
  let id = req.body._id;
  console.log(req.body);
  delete req.body._id;
  //console.log(req.body); // => { name:req.body.name, description:req.body.description }
  req.db.collection('item').updateOne({_id:new mongodb.ObjectID(id)}, {$set: req.body}, (error, result) => {
    let responseBody = {};
    if(error){
      console.dir(error);
      responseBody.error = "error";
    } else {
      responseBody._id = id;
    }
    //console.dir(result);
    res.json(responseBody);
  });
});

router.delete("/", (req, res, next) => {
  // delete item
  let id = req.query._id;
  console.log("delete item " + id);
  let objectId = "ObjectId(" + id + ")";
  req.db.collection('item').deleteOne({_id:new mongodb.ObjectID(id)}, (error, result) => {
    let responseBody = {};
    if(error){
      console.dir(error);
      responseBody.error = "error";
    } else {
      responseBody._id = id;
    }
    //console.dir(result);
    res.json(responseBody);
  });
});


module.exports = router;



// morgan logger
/*
var loggerFormat = ':id [:date[web]] ":method :url" :status :response-time';

app.use(logger(loggerFormat, {
  skip: function (req, res) {
    return res.statusCode < 400
  },
  stream: process.stderr
}));

app.use(logger(loggerFormat, {
  skip: function (req, res) {
    return res.statusCode >= 400
  },
  stream: process.stdout
}));
*/


app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/qunit', express.static(__dirname + '/node_modules/qunit/qunit'));