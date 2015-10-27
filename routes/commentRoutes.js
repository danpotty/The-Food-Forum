var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');
var passport = require('passport');


// Get Comments By Topic
router.get("/:id", function(req, res, next) {
  Comment.find({topicid: req.params.id}).exec(function(err,result) {
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

 router.delete('/:id', function(req, res, next){
   Comment.remove({_id: req.params.id}, function(err, result){
     if(err) return next(err);
     res.send();
   });
 });

 router.put('/', function(req, res, next){
   Comment.update({_id: req.body._id}, req.body, function(err, result){
     if(err) return next(err);
     if(!result) return next({err: 'The comment was not found...'});
     res.send(result);
   });
 });

//
// router.get('/', function(req, res, next){
//   CommentPost.find({}).exec(function(err, result){
//     if(err) return next(err);
//     res.send(result);
//   });
// });
//
// router.get('/:id', function(req, res, next){
//   CommentPost.findOne({_id: req.params.id}, function(err, result){
//     if(err) return next(err);
//     if(!result) return next('Could not find that comment.');
//     res.send(result);
//   });
// });
//
// router.post('/:id/comment', function(req, res, next){
//   var comment = {
//     content: req.body.body,
//     user: req.payload._id,
//     date: Date,
//     upvote: 0,
//     spam: 0
//   };
//   CommentPost.findOne({_id: req.params.id}, function(err, topic){
//     if(err) return next(err);
//     if(!topic) return next('Could not find that topic');
//     topic.comments.push(comment);
//     topic.save(function(err, result){
//       res.send(topic);
//     });
//   });
// });
//
//


module.exports = router;
