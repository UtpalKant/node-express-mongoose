const User = require('../../models/user.model');
const mongoose = require('mongoose');
const {mongodbClusterUrl, defaultdb} = require('../../config');

let createConnection = (mongoBaseUrl, dbName) => {
    return mongoose.connect(`${mongoBaseUrl+dbName}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}

module.exports = {
    async userPosts(id) {
        // close any connection.
        await mongoose.connection.close();
        return new Promise((resolve, reject)=>{
            createConnection(mongodbClusterUrl, defaultdb)
                .then(() => {
                    // send the promise.
                    resolve(User.find({}));
                })
                .catch(err => reject('Error while fetching posts.'));
        })
    }
}