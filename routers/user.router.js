// const userController = require('../controllers/user.controller');
const express  = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth')
const isAdmin = require('../middlewares/admin');
const {createAccount, login, getUsers,updateUserRole,resetPassword} = require('../controllers/user.controller')


router.post('/signUp',createAccount);

router.post('/login', login);

router.get('/allUsers',getUsers);

router.put('/updateRole/user/:id/role/:role',[isAdmin],updateUserRole);

router.put('/resetpassword/user/:id', [isAdmin],resetPassword);


module.exports = router;