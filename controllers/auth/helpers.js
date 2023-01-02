const types = require('./types')
const jwt = require('jsonwebtoken')

// function generateToken(data, type) {
// 	switch (type) {
// 		case types.accessToken:
// 			return jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1440m' })  // 1440 = 1 day
// 		case types.refreshToken:
// 			return jwt.sign(data, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '43800m' }) // 43800 = 1 month
// 		default:
// 			return false
// 	}
// }

// function verifyToken(token, type) {
// 	switch (type) {
// 		case types.accessToken:
// 			return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
// 		case types.refreshToken:
// 			return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
// 		default:
// 			return false
// 	}
// }

function generateToken(data) {
	return jwt.sign(data, process.env.ACCESS_TOKEN_SECRET)
}

function verifyToken(token) {
	return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
}

module.exports = { generateToken, verifyToken }