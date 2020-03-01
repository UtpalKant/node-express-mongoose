const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Users = mongoose.Schema({
    id: {type: Number},
    name: {type: String},
    username: {type: String},
    email: {type: String, unique: true},
    address: {type: Object},
    phone: {type: String},
    website: {type: String},
    company: {type: Object},
    password: {type: String},
    role: {type: String}
});

Users.plugin(uniqueValidator);

const UsersModel = mongoose.model('users', Users);
module.exports = UsersModel;