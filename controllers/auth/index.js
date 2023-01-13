const { firebase_firestore } = require('../../utils/db')
const firebaseAdmin = require('firebase-admin')
const bcrypt = require('bcrypt')
const { generateToken, verifyToken } = require('./helpers')
// const types = require('./types')

const usersCollectionName = 'users'
const tokensCollectionName = 'tokens'

async function auth_register(req, res) {
	const { username, password } = req.body

	const userReference = await firebase_firestore.collection(usersCollectionName).doc(username).get()
	if (userReference.exists) return res.status(400).json({ message: `User with name ${ username } already exists!` })

	const salt = await bcrypt.genSalt()
	const hashedPassword = await bcrypt.hash(password, salt)
	const timestamp = firebaseAdmin.firestore.FieldValue.serverTimestamp()

	await userReference.ref.create({ username, password: hashedPassword, create_timestamp: timestamp, update_timestamp: timestamp })

	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
	return res.redirect(req.headers.origin + '/login')
}

// async function auth_login(req, res) {
// 	const { username, password } = req.body

// 	const userDoc = await firebase_firestore.collection(usersCollectionName).doc(username).get()
// 	if (!userDoc.exists) return res.status(400).json({ message: `Invalid details provided!` })

// 	const validPassword = await bcrypt.compare(password, userDoc.data().password)
// 	if (!validPassword) return res.status(400).json({ message: `Invalid details provided!` })

// 	const authTokensDoc = await firebase_firestore.collection(tokensCollectionName).doc(username).get()

// 	const userData = { username }

// 	if (authTokensDoc.exists) {
// 		const tokens = authTokensDoc.data()
// 		const accessTokenValid = verifyToken(tokens.accessToken, types.accessToken)
// 		const refreshTokenValid = verifyToken(tokens.refreshToken, types.refreshToken)

// 		if (accessTokenValid && refreshTokenValid) return res.status(200).json({ accessToken: tokens.accessToken, refreshToken: tokens.refreshToken })

// 		if (!accessTokenValid && refreshTokenValid) {
// 			const accessToken = generateToken(userData, types.accessToken)
// 			if (!accessToken) return res.status(500).json({ message: 'Failed to log you in!' })

// 			await firebase_firestore.collection(tokensCollectionName).doc(username).update({ accessToken })
// 			return res.status(200).json({ accessToken, refreshToken: tokens.refreshToken })
// 		}

// 		if (!refreshTokenValid) await firebase_firestore.collection(tokensCollectionName).doc(username).delete()
// 	}

// 	const accessToken = generateToken(userData, types.accessToken)
// 	const refreshToken = generateToken(userData, types.refreshToken)

// 	if (!(accessToken && refreshToken)) return res.status(500).json({ message: 'Failed to log you in!' })

// 	await firebase_firestore.collection(tokensCollectionName).doc(username).create({ accessToken, refreshToken })
// 	return res.status(200).json({ accessToken, refreshToken })
// }

async function auth_login(req, res) {
	const { username, password } = req.body

	const userDoc = await firebase_firestore.collection(usersCollectionName).doc(username).get()
	if (!userDoc.exists) return res.status(400).json({ message: `Invalid details provided!` })

	const validPassword = await bcrypt.compare(password, userDoc.data().password)
	if (!validPassword) return res.status(400).json({ message: `Invalid details provided!` })

	const authTokensDoc = await firebase_firestore.collection(tokensCollectionName).doc(username).get()
	if (authTokensDoc.exists) return res.status(400).json({ message: 'Already logged in!' })

	const userTokenDetails = { username }
	const accessToken = generateToken(userTokenDetails)

	await firebase_firestore.collection(tokensCollectionName).doc(username).create({ accessToken })

	return res.status(200).json({ accessToken })

}

async function auth_logout(req, res) {
	let authToken = req.headers[ 'authorization' ]
	if (!authToken) return res.status(400).json({ message: 'No authorization token provided!' })

	authToken = authToken.split(' ')[ 1 ]
	const isTokenValid = verifyToken(authToken)

	if (!isTokenValid) return res.status(400).json({ message: 'Token did not match!' })

	const tokenDoc = await firebase_firestore.collection(tokensCollectionName).doc(req.body.username).get()
	const tokenDetails = tokenDoc.data()

	if (!(isTokenValid.payload.username === req.body.username)) return res.status(400).json({ message: 'Token did not match!' })

	if (!(tokenDetails.accessToken === authToken)) return res.sendStatus(400)

	await tokenDoc.ref.delete()
	return res.sendStatus(200)
}

module.exports = {
	auth_register,
	auth_login,
	auth_logout
}