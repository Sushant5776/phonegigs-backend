const express = require('express')
const controllers = require('../controllers/auth')
const registerLoginValidator = require('../utils/validators/auth/register_or_login')
const logoutValidator = require('../utils/validators/auth/logout')

const router = express.Router()

router.post('/register', registerLoginValidator, controllers.auth_register)
router.post('/sign_in', registerLoginValidator, controllers.auth_login)
router.post('/sign_out', logoutValidator, controllers.auth_logout)

module.exports = router