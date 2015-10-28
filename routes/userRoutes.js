var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var passport = require('passport');
var Topic = mongoose.model('Topic');

router.post("/register", function(req, res, next){
   var user = new User(req.body);
   user.setPassword(req.body.password);
   user.save(function(err,result){
      if(err) return next(err);
      if(!result) return next("There was an error registering user.");
      res.send(result.createToken());
   });
});

router.post("/login", function(req, res, next){
   passport.authenticate("local", function(err, user){
      if(err) return next(err);
      res.send(user.createToken());
   })(req, res, next);
});

router.get("/:author", function(req, res, next) {
  Topic.find({subForum: req.params.author}).exec(function(err, result) {
    if(err) return next(err);
    res.send(result);
  });
});


// router.put('/profile', function(req, res, next){
//   User.update({_id: <id>},{bio: <value>, profilePic: <value>})
// });

router.post('/', function(req, res, next){
  User.update({_id: req.body.userId}, {bio: req.body.newBio}).exec(function(err, result){
    if(err) return next(err);
    res.send(result);
  });
});


router.post('/', function(req, res, next){
  User.update({_id: req.body.userId}, {profilePic: req.body.newPic}).exec(function(err, result){
    if(err) return next(err);
    res.send(result);
  });
});

module.exports = router;
