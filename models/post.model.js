const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Posts = mongoose.Schema({
    userId: {type: Number},
    id: {type: Number, unique: true},
    title: {type: String, unique: true},
    body: {type: String},
    comments: [Object]
});

Posts.plugin(uniqueValidator);

const PostsModel = mongoose.model('posts', Posts);
module.exports = PostsModel;