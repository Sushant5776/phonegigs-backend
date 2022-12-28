const express = require('express')
const productControllers = require('../controllers/productControllers')
const updateProductValidator = require('../utils/validators/patchProduct')
const postProductValidator = require('../utils/validators/postProduct')

const router = express.Router()

// get product with id
router.get('/:id', productControllers.product_get_specific)

// get all products
router.get('/', productControllers.product_index)

// post specific product
router.post('/', postProductValidator, productControllers.product_post_specific)

// patch / update specific product
router.patch('/:id', updateProductValidator, productControllers.product_patch_specific)

// delete specific product
router.delete('/:id', productControllers.product_delete_specific)

module.exports = router