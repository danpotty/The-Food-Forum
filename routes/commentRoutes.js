var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');
var passport = require('passport');


// Get Comments By Topic
router.get("/:id", function(req, res, next) {
  Comment.find({topicid: req.params.id}).sort({date: 'ascending'}).exec(function(err,result) {
    if(err) return next(err);
    res.send(result);
  });
});

// Add Comment
router.post("/", function(req, res, next) {
  var comment = new Comment(req.body);
  comment.save(function(err, result){
    if(err) return next(err);
    res.send(result);
  });
});

// Delete Comments
 router.delete('/:id', function(req, res, next){
   Comment.remove({_id: req.params.id}, function(err, result){
     if(err) return next(err);
     res.send();
   });
 });

// Edit Comments
 router.put('/', function(req, res, next){
   Comment.update({_id: req.body._id}, req.body, function(err, result){
     if(err) return next(err);
     if(!result) return next({err: 'The comment was not found...'});
     res.send(result);
   });
 });

 // Up Vote / Down Vote
  router.put('/:id', function(req, res, next){
   console.log(req.body);
   Comment.update({_id: req.body._id}, req.body, function(err, result){
     if(err) return next(err);
     if(!result) return next({err: 'The comment was not found...'});
     res.send(result);
   });
  });

module.exports = router;
