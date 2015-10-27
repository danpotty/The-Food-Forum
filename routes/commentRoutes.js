var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var passport = require('passport');

router.get('/', function(req, res, next){
  CommentPost.find({}).exec(function(err, result){
    if(err) return next(err);
    res.send(result);
  });
});

router.get('/:id', function(req, res, next){
  CommentPost.findOne({_id: req.params.id}, function(err, result){
    if(err) return next(err);
    if(!result) return next('Could not find that comment.');
    res.send(result);
  });
});

router.post('/:id/comment', function(req, res, next){
  var comment = {
    content: req.body.body,
    user: req.payload._id,
    date: Date,
    upvote: 0,
    spam: 0
  };
  CommentPost.findOne({_id: req.params.id}, function(err, topic???){
    if(err) return next(err);
    if(!topic) return next('Could not find that topic');
    topic.comments.push(comment);
    topic.save(function(err, ???){
      res.send(topic);
    });
  });
});

router.put('/', function(req, res, next){
  CommentPost.update({_id: req.body.IdofCommentToEdit}, req.body.commentEditted, function(err, result){
    if(err) return next(err);
    if(!result) return next({err: 'The comment was not found...'});
    res.send(result);
  });
});

router.delete('/:id', function(req, res, next){
  CommentPost.remove({_id: req.params.id}, function(err, result){
    if(err) return next(err);
    console.log(result);
    res.send();
  });
});

module.exports = router;
