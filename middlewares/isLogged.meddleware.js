const tokenRequest = require("../requests/token.request");

function isLogged(req, res, next){

    const token = req.cookies.authToken;
    
    if(!token) return next();

    const decoded_user = tokenRequest(token);

    if(!decoded_user.success) return next();
    
    return res.json({ error: 'You are logged Now, logout first!' });
}

module.exports = isLogged;