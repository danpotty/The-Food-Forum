var mongoose = require('mongoose');

var CommentPostSchema = new mongoose.Schema({
  user: String,
  date: Date,
  body: String,
  upvote: Number,
  spam: Number,
  topicid: String

});

mongoose.model('Comment', CommentPostSchema);
