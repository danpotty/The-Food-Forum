var mongoose = require('mongoose');

var CommentPostSchema = new mongoose.Schema({
  author: String,
  date: Date,
  body: String,
  upvote: Number,
  spam: Number,
  topicid: String,
  voters: Array
});

mongoose.model('Comment', CommentPostSchema);
