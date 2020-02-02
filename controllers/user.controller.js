const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { validationResult} = require('express-validator');

const models = require("../database/models");
const { jwtSecret, envMode, token_expires_in } = require('../_helpers/myFunctions/config');
const { functions } =  require('../_helpers/myFunctions');
const { createUserValidation, authValidation } =  require('../validations').userValidation;


// routes
router.post('/authenticate', authValidation, authenticate);
router.get('/current', getCurrent);
// router.get('/:id', getById);

router.post('/register', createUserValidation, create);
router.get('/', getAll);

// console.log('userValidation: ' + JSON.stringify(createUserValidation));

module.exports = router;


async function authenticate(req, res, next) {
	const errors = validationResult(req);
	// if(!(req.body.email || req.body.password)) return res.status(400).send("Enter valid username/password");
	if (!errors.isEmpty()) {		
		return res.status(422).json({status: 'error', errors: errors.array()});
	}
	try {
		const { email, password } = req.body;
		const user = await models.User.findOne({ where: { email } });

		if (user) {
			if (bcrypt.compareSync(password, user.hash)) {

				return res.status(200).json({ status: 'success',
					token: jwt.sign({ sub: user.id }, jwtSecret, { expiresIn: token_expires_in }),
					// user data to return as json
					userId: user.id,
					email: user.email,
					firstname: user.firstname,
					lastname: user.lastname,
					expiresIn: functions.tokenTimeToSeconds(token_expires_in)
			});
			// }
			}

			return res.status(401).send("Invalid Username/Password");
		}
		return res.status(404).send("User with the email does not exist");
	} 
	catch (error) {
		return res.status(500).send(error.message);
	}
}


async function create(req, res) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {		
		return res.status(422).json({status: 'error', errors: errors.array()});
	}
	try {
		// console.log('ll');
		req.body.hash = await bcrypt.hashSync(req.body.password, 15);
		
		const user = await models.User.create(req.body);
		return res.status(201).json({ status: 'success', data: user });
	} 
	catch (error) {
		return res.status(500).json({ error: error.message });
	}
};


async function getAll(req, res) {
	try {
		const users = await models.User.findAll({
			attributes: { exclude: ['hash', 'firstname', 'lastname'] },
		});
		return res.status(200).json({ status: 'success', data: users  });
	} 
	catch (error) {
		return res.status(500).send(error.message);
	}
};


async function getCurrent(req, res, next) {
	try {
		const user = await models.User.findOne({ 
			attributes: { exclude: ['hash'] },
			where: { id: req.user.sub }
		});
		if (user) {
			return res.status(200).json({ status: 'success', data: user });
		}
		return res.status(404).send("User with the specified ID does not exists");
	} 
	catch (error) {
		return res.status(500).send(error.message);
	}
}