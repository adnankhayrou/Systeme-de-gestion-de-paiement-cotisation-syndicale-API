const tokenRequest = require("../requests/token.request");

function isLoggedOut(req, res, next){

    const token = req.cookies.authToken;
    
    if(token) return next();

    const decoded_user = tokenRequest(token);

    if(decoded_user.success) return next();
    
    return res.json({ error: 'You are logged out Now, login first!' });
}

module.exports = isLoggedOut;