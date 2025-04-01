const joi = require("joi");

const signUpValidator = (req, res, next) => {
  const schema = joi.object({
    name: joi.string().min(2).max(70).required(),
    email: joi.string().email().required(),
    role: joi.string().valid("manager", "admin", "user").default("user"),
    password: joi.string().min(6).max(30).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ success: false, error: error });
  }
  next();
};

const loginValidator = (req, res, next) => {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).max(30).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error });
  }
  next();
};

module.exports = { signUpValidator, loginValidator };
