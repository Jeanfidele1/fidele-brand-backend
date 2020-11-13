const express = require ('express');
const AuthMiddleWare  = require('../middlewares/auth');
// import {auth} from '../middlewares/auth';
const commentController = require('../controllers/comment.controller');
 
const commentRouter = express.Router();
 
// comments Routes
commentRouter.post('/comments/:_id', auth, commentController.addComment)
commentRouter.get('/comments/:_id', commentController.readComment)
 
// export default commentRouter;
module.exports = commentRouter;

