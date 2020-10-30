const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const usersRoutes = require('./routers/user.router');
const blogsRoutes = require('./routers/blogs.routes');
const inquiryRoutes = require('./routers/inquiries.routes');

require('dotenv').config()


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.get('/',(req,res)=>{
    res.send("Welcome to fidele Bland").status(200)
})
app.use('/api/users',usersRoutes);
app.use('/api/blogs',blogsRoutes);
app.use('/api/inquiries',inquiryRoutes);

module.exports = app;