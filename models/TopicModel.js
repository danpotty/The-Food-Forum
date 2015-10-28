var mongoose = require('mongoose');

var TopicPostSchema = new mongoose.Schema({
  title: String,
  author: String,
  subForum: String,
  body: String,
  createdOn: Date,
  url: String
});

mongoose.model('Topic', TopicPostSchema);
