// const { body } = require('express-validator/check')
const {check } = require('express-validator');


// variables
const nameChk = [ 
  check('firstname', `Invalid firstname`).optional().isAlpha().isLength({min: 2}).trim().escape(),
  check('lastname', `Invalid lastname`).optional().isAlpha().isLength({min: 2}).trim().escape()
]

const emailPwdChk = [ 
  check('email', 'Invalid email').isEmail().normalizeEmail(),
  check('password', 'Invalid password').isLength({min: 4})
]


// validations
const createUserValidation = nameChk.concat(emailPwdChk)


module.exports = {
  createUserValidation,
  authValidation: emailPwdChk
}