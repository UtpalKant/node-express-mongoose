const express = require('express');
const routes = express.Router();
const {userPosts} = require('./admin.service');

routes.get('/users', async (req, res, next)=>{
    try{
        const users = await userPosts();
        res.statusCode = 200;
        res.json(users);
    } catch(err){
        res.statusCode = 500;
        res.send(err);
    }
});


module.exports = routes;