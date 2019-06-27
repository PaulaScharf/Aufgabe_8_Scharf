// jshint esversion: 8
// jshint node: true
"use strict";

var express = require('express');
var router = express.Router();

const mongodb = require('mongodb');

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
