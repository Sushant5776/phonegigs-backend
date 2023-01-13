const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const productRouter = require('./routes/product')
const authRouter = require('./routes/auth')

dotenv.config({ path: '.env.local' })

app = express()

app.use(cors({ origin: 'http://localhost:3000' }))
app.use(express.json())

app.use('/auth', authRouter)
app.use('/product', productRouter)

app.listen(process.env.PORT || 3000, () => console.log(`💡 Server started listening on port ${ process.env.PORT }`))