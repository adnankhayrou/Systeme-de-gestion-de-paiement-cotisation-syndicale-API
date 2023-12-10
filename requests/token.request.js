require('dotenv').config();
const jwt = require('jsonwebtoken');

function tokenRequest(token) {
    try{
        let decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        let data = {"success": "Your Token is valid", "data": decodeToken};
        return data;
    } catch (err) {
        return {"error": "Token is invalid"}
    }
}

module.exports = tokenRequest;