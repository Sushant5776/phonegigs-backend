const { check } = require('express-validator')

const validator = [
	check('username').isString().isLength({ min: 6, max: 20 }),
	check('password').isString().isLength({ min: 8, max: 20 }),
]

module.exports = validator