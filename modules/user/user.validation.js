import Joi from "joi";

export const changePassSchema = Joi.object({
    currentPassword:Joi.string().required(),
    newPassword:Joi.string().required(),
})
