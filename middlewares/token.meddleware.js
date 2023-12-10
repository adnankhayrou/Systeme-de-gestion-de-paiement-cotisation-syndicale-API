const tokenRequest = require('../requests/token.request');


function checkToken(req, res, next){

    const token = req.params.token || req.cookies.authToken;
    if(!token) {
        return res.status(401).json({ error: `You Don't Have Access` });
    }

    const decodeUser = tokenRequest(token);
    if(!decodeUser.success){
        return res.status(401).json({ error: `You Don't Have Access` })
    }
    req.user = decodeUser.data;
    next();

}

module.exports = checkToken;