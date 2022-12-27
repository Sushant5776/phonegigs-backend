const db = require('../utils/db')
const { validationResult } = require('express-validator')

// get single product using specific id
async function product_get_specific(req, res) {
	const document = await db.firestore().collection('products').doc(req.params.id).get()
	if (!document.exists) return res.status(404).json({ message: `No such document exists with id ${ document.id }!` })

	res.status(200).json({ id: document.id, ...document.data() })
}

// get all products
async function product_index(_req, res) {
	const collection = await db.firestore().collection('products').get()
	const products = collection.docs.map(document => ({ id: document.id, ...document.data() }))

	res.status(200).json(products)
}

// update single product using specific id
async function product_patch_specific(req, res) {
	if (!(typeof req.body === 'object' && !Array.isArray(req.body) && req.body !== null)) return res.status(400).json({ message: 'invalid details provided!' })

	const errors = validationResult(req)
	if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() })

	let document = await db.firestore().collection('products').doc(req.params.id).get()

	if (!document.exists) return res.status(404).json({ message: `No such document exists with id: ${ req.params.id }` })

	await db.firestore().collection('products').doc(req.params.id).update(req.body)

	document = await db.firestore().collection('products').doc(req.params.id).get()

	res.status(200).json({ id: req.params.id, ...document.data() })
}

module.exports = {
	product_index,
	product_get_specific,
	product_patch_specific
}