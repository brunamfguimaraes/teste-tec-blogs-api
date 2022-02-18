const { User } = require('../models');
const { Category } = require('../models');
const codes = require('./codes');
const Indexerror = require('./Indexerror');
const errorMessages = require('./errorMessages');

const validateDisplayName = (displayName, min) => {
  if (displayName.length < min) {
    throw new Indexerror(codes.badRequest, errorMessages.nameLengthError);
  }
};

const emailAlreadyExists = async (email) => {
  const user = await User.findOne({ where: { email } });
    return user;
};

const emailValidation = (email) => {
  const re = /^\w+[\W_]?\w*@[a-z]+\.[a-z]{2,3}(?:.br)?$/;
  return re.test(email);
 };

const emailValidate = (email) => {
  if (email === '') throw new Indexerror(codes.badRequest, errorMessages.emailIsNotEmpty);
  if (!email) throw new Indexerror(codes.badRequest, errorMessages.emailIsRequired);
  if (!emailValidation(email)) {
    throw new Indexerror(codes.badRequest, errorMessages.invalidEmail);
}
};

 const passwordValidation = (password, min) => {
  if (password === '') throw new Indexerror(codes.badRequest, errorMessages.passwordIsNotEmpty);
  if (!password) throw new Indexerror(codes.badRequest, errorMessages.isrequired);
  if (password.length < min) {
    throw new Indexerror(codes.badRequest, errorMessages.invalidPassword);
}
};

const verifyCreateUser = async (displayName, email, password) => {
  validateDisplayName(displayName, 8);
  passwordValidation(password, 6);
  emailValidate(email);
  if (await emailAlreadyExists(email)) {
    throw new Indexerror(codes.conflict, errorMessages.alreadyExists);
  }
};