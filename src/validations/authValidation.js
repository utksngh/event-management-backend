const Joi = require('joi');

const registerSchema = Joi.object({
    name : Joi.string().min(3).max(30).required(),
    email : Joi.string().email().required(),
    password : Joi.string().min(6).required(),
    role: Joi.string().valid("attendee", "organizer").required()
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

const createUpdateEventSchema = Joi.object({
    title: Joi.string().min(10).max(20).required(),
    date: Joi.string().pattern(/^([0-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/).required().messages({
        "string.pattern.base": "Date must be in DD/MM/YYYY format."
    }),
    time: Joi.string()
        .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/) // Matches HH:mm format (24-hour)
        .required()
        .messages({
            "string.pattern.base": "Time must be in HH:mm format (24-hour).",
    }),
    description: Joi.string().min(5).max(500).required()
});

module.exports = { registerSchema, loginSchema, createUpdateEventSchema }