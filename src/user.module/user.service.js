const Post = require('../../models/post.model');
const mongoose = require('mongoose');
const {mongodbClusterUrl} = require('../../config');

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
            createConnection(mongodbClusterUrl, `user${id}`)
                .then(() => {
                    // send the promise.
                    resolve(Post.find({}));
                })
                .catch(err => reject('Error while fetching posts.'));
        })
    }
}