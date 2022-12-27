const firebaseAdmin = require('firebase-admin')
const serviceAccount = require('./phonegigs-firebase-adminsdk.json')

const adminDB = !firebaseAdmin.apps.length ? firebaseAdmin.initializeApp({ credential: firebaseAdmin.credential.cert(serviceAccount) }) : firebaseAdmin.app()

module.exports = adminDB