const jwt = require('jsonwebtoken');
const config = require('config');

function auth(req,res,next){
    let header = req.header('Bearer');
    if(!header) return res.send({success: false, status: 401, message: 'Un Authorized'}).status(400);

    try{
        const decode = jwt.verify(header, config.get('jwtPrivateKey'))
        const user = decode;
        if(user){
            next();
        }
        else{
            res.send({succes: false, status: 401, message: 'Invalid token'}).status(401)
        }

    }
    catch(err){
        res.send({success: false, error: err}).status(400)
    }
}

module.exports = auth;