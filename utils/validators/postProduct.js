const { check } = require('express-validator')

const postProductValidator = [
	check('image').isURL(),
	check('price').isInt({ min: 0 }),
	check('quantity').isInt({ min: 0 }),
	check('description').isString().isLength({ min: 300 }),
	check('make').isString().isLength({ min: 4, max: 16 }),
	check('name').isString().isLength({ min: 1 })
]

module.exports = postProductValidator