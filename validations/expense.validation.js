// const { body } = require('express-validator/check')
const {check } = require('express-validator');


// variables
const expenseChk = [ 
  check('value', `Invalid value`).exists().isNumeric({ min: 2 }).trim(),
  check('vat', `Invalid vat`).exists().isNumeric({ min: 1 }).trim(),
  check('userId', `Invalid userId`).exists().isLength({min: 1}),
  check('reason', `Invalid reason`).optional().isLength({min: 2}).trim().escape()
]



module.exports = {
  expenseChk,
}