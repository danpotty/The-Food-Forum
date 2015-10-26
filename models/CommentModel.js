var mongoose = require('mongoose');

var CommentPostSchema = new mongoose.Schema({
  user: String,
  date: Date,
  content: String,
  upvote: Number,
  spam: Number

});

mongoose.model('TopicPost', TopicPostSchema);
