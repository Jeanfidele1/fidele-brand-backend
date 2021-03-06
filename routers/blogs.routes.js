const express = require('express');
const router = express.Router();
const AuthMiddleWare  = require('../middlewares/auth');
const {createBlog,getBlogs,getBlogById,updateBlog,deleteBlog} = require('../controllers/blogs.controller');

router.post('/addBlog', [AuthMiddleWare],createBlog);

router.get('/allBlogs',getBlogs);

router.get('/getBlog/:id',getBlogById);

router.put('/updateBlog/:id',[AuthMiddleWare],updateBlog);

router.delete('/delete/:id', [AuthMiddleWare],deleteBlog);

module.exports = router;