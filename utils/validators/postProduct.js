const { check } = require('express-validator')

const postProductValidator = [
	check('image').trim().isURL(),
	check('price').isInt({ min: 0 }),
	check('quantity').isInt({ min: 0 }),
	check('description').trim().isString().isLength({ min: 300 }),
	check('make').trim().isString().isLength({ min: 4, max: 16 }),
	check('name').trim().isString().isLength({ min: 1 })
]

module.exports = postProductValidator