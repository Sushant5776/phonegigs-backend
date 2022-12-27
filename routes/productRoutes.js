const express = require('express')
const productControllers = require('../controllers/productControllers')
const updateProductValidator = require('../utils/validators/patchProduct')

const router = express.Router()

// get product with id
router.get('/:id', productControllers.product_get_specific)
// get all products
router.get('/', productControllers.product_index)

// TODO: post specific product

// patch / update specific product
router.patch('/:id', updateProductValidator, productControllers.product_patch_specific)

// TODO: delete specific product

module.exports = router