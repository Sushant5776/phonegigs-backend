const { check } = require('express-validator')

const patchProductValidator = [
	check('image').optional().isURL(),
	check('price').optional().isInt({ min: 0 }),
	check('quantity').optional().isInt({ min: 0 }),
	check('description').optional().isString().isLength({ min: 300 }),
	check('make').optional().isString().isLength({ min: 4, max: 16 }),
	check('name').optional().isString().isLength({ min: 1 })
]

module.exports = patchProductValidator