var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Topic = mongoose.model('Topic');
var passport = require('passport');

// Get Topics By SubForum
router.get("/:subforum", function(req, res, next) {
  Topic.find({subForum: req.params.subforum}).exec(function(err,result) {
    if(err) return next(err);
    res.send(result);
  });
});

// Add Topic
router.post("/", function(req, res, next) {
  var topic = new Topic(req.body);
  topic.save(function(err, result){
    if(err) return next(err);
    res.send(result);
  });
});

// Delete Topic
router.delete("/:id", function(req, res, next) {
  Topic.remove({_id: req.params.id}, function(err, result) {
    if(err) return next(err);
    res.send(result);
  });
});


module.exports = router;
