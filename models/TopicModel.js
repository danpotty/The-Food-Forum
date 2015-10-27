var mongoose = require('mongoose');

var TopicPostSchema = new mongoose.Schema({
  title: String,
  author: String,
  subForum: String,
  body: String,
  date: Date,
  url: String
});

mongoose.model('Topic', TopicPostSchema);
