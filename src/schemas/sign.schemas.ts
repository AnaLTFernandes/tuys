import Joi from "joi";

const imageFormatRegex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/;

const postSignUp = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().message("Email inválido!").required(),
  avatar: Joi.string().regex(imageFormatRegex).message("A url da imagem é inválida!").required(),
  password: Joi.string().min(6).required(),
});

export { postSignUp };
