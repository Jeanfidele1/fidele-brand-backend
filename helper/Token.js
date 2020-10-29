import jwt from 'jsonwebtoken';

// const jwt = require('jsonwebtoken');
 export const generateToken = (newUser) => {
   const {fullName, emai, _id} = newUser;
   return jwt.sign({fullName, email, _id}, 'uyguhuihuihi',  { expiresIn: '600s' });
 }
