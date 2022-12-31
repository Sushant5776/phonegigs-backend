const express = require('express')
const controllers = require('../controllers/product')
const patchValidator = require('../utils/validators/product/patch')
const postValidator = require('../utils/validators/product/post')

const router = express.Router()

// get product with id
router.get('/:id', controllers.product_get_specific)

// get all products
router.get('/', controllers.product_index)

// post specific product
router.post('/', postValidator, controllers.product_post_specific)

// patch / update specific product
router.patch('/:id', patchValidator, controllers.product_patch_specific)

// delete specific product
router.delete('/:id', controllers.product_delete_specific)

module.exports = router