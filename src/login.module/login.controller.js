const express = require('express');
const routes = express.Router();
const { verifyDetails } = require('./login.service');

routes.post('/login', async (req, res, next)=>{
    try{
        const access_token = await verifyDetails(req.body.email, req.body.password);
        res.statusCode = 200;
        res.send({access_token});
    } catch(err){
        res.statusCode = 500;
        res.send(err);
    }
});


module.exports = routes;