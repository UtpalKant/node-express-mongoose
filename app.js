// library imports.
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();

// using mongoose.
const mongoose = require('mongoose');

// using body parser.
app.use(bodyParser.urlencoded({ extended: false }));

// using cookie-parser.
app.use(cookieParser());

// custom imports.
const router = require('./routes/router');
require('dotenv').config();
const {defaultdb, mongodbClusterUrl} = require('./config');

// setting mongoose orm
mongoose.connect(`${mongodbClusterUrl+defaultdb}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(_=>{
    // calls routes/router middleware.
    app.use(router);  
    // server listening.
    app.listen(process.env.PORT, ()=>{
        console.log(`node started at ${process.env.PORT}`);
    });
})
.catch(err=>{
    console.log('mongodb cluster not connected', err);
});
