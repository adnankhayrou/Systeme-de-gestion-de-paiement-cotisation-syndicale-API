const Joi = require('joi');

function RegisterValidation(reqBody){
    const register = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required(),
    });
    return register.validate(reqBody);
}

function LoginValidation(reqBody){
    const login = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required(),
    });
    return login.validate(reqBody);
}


module.exports.authRequest = {
    RegisterValidation,
    LoginValidation,
};