const express = require('express');
const routes = express.Router();
const { userPosts } = require('../user.module/user.service');

routes.get('/getuser', async (req, res, next)=>{
    try{
        res.statusCode = 200;
        res.json(req.user);
    } catch(err){
        res.statusCode = 500;
        res.send(err);
    }
});

routes.get('/getpost', async (req, res, next)=>{
    try{
        const posts = await userPosts(req.user.id);
        res.statusCode = 200;
        res.json(posts);
    } catch(err){
        res.statusCode = 500;
        res.send(err);
    }
});

module.exports = routes;