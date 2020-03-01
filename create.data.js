const request = require("request");
const { mongodbClusterUrl, baseUrl  } = require('./config');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const UsersModel = require('./models/user.model');
const PostsModel = require('./models/post.model');

// get data from api.
getData = (routeUrl) => {
    const options = {
        method: 'GET',
        url: `${baseUrl}${routeUrl}`
    };
    return new Promise((resolve, reject) => {
        request(options, (error, response) => {
            if (error) reject(error);
            resolve(JSON.parse(response.body));
        });
    });
};

// connection creation method.
let createConnection = (dbName) => {
    return mongoose.connect(`${mongodbClusterUrl}${dbName}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}

const importPosts = (users)=>{
// getting post & comments data.
getData('posts').then(posts_response => {
    let posts = posts_response;

    // getting comments data.
    getData('comments').then(comments_response => {
        let comments = comments_response;

        //mapping comments to posts.
        posts.forEach((post, i) => {
            posts[i]['comments'] = comments.filter(comment => comment.postId === post.id)
        })

        // creating seperate db for users & saving data.
        users.forEach(user => {
            createConnection(`user${user}`)
                .then(_ => {
                    const userPosts = posts.filter(post => post.userId === user);
                    // inserting post & comments to db
                    PostsModel.collection.insertMany(userPosts, async (err, docs) => {
                        if (err) console.log(err.errmsg);
                        await mongoose.connection.close();
                    })
                })
                .catch(err => console.log('db connection err: ', err));
        });


    });
});
}

// setting data to db
getData('users').then(response => {
    // creating password & admin roles
    response = response.map((user, index) => {
        let userVal = {...user, password: 'P@ssw0rd'};
        if(index === 0 || index === 1 || index === 2){
            userVal = {...user, password: 'P@ssw0rd', role: 'admin'};
        }
        return userVal;
    });

    // importing all users to db
    createConnection('master')
        .then(_ => {
            UsersModel.collection.insertMany(response, async (err, docs) => {
                if (err) console.log(err.errmsg);
                await mongoose.connection.close();
                const users = response.map(user=>user.id);

                // importing posts & comments
                importPosts(users);
            })
        })
        .catch(err => console.log('db connection err: ', err));
});