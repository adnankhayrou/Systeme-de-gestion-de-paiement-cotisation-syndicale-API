const Joi = require('joi');

function EmailValidation(reqBody){
    const email = Joi.object({
        email: Joi.string().required().email(),
    });
    return email.validate(reqBody);
}

function PasswordValidation(reqBody){
    const password = Joi.object({
        password: Joi.string().required().valid(Joi.ref('confirmPassword')).messages({
            'any.only': 'password does not match'
        }),
        confirmPassword: Joi.string().required(),
    });
    return password.validate(reqBody);
}

module.exports.emailAndPasswordRequest = {
    EmailValidation,
    PasswordValidation
};