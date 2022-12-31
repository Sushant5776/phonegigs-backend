const { check } = require('express-validator')

const validator = [
	check('image').optional().trim().isURL(),
	check('price').optional().isInt({ min: 0 }),
	check('quantity').optional().isInt({ min: 0 }),
	check('description').optional().trim().isString().isLength({ min: 300 }),
	check('make').optional().trim().isString().isLength({ min: 4, max: 16 }),
	check('name').optional().trim().isString().isLength({ min: 1 })
]

module.exports = validator