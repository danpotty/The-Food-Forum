var mongoose = require('mongoose');

var TopicPostSchema = new mongoose.Schema({
  title: String,
  author: String,
  date: Date,
  content: String,
  image: String
});

mongoose.model('TopicPost', TopicPostSchema);
