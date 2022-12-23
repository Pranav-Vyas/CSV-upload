const express = require('express');
const dotenv = require("dotenv");
const session = require("express-session");

dotenv.config({path: './config.env'});

const app = express()
app.use(express.json());
const port  = process.env.port || 5000
const secret = process.env.SECRET;

app.use(express.json());
require('./database')

app.use(session(
    {
        secret: secret,
        resave: true,
        saveUninitialized: false
    }
))

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/',require('./api/contact'));
app.use('/',require('./api/register'));
app.use('/',require('./api/login'));
app.use('/',require('./api/logout'));

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})