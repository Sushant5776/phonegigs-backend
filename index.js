const express = require('express')
const dotenv = require('dotenv')
const productRouter = require('./routes/productRoutes')

dotenv.config({ path: '.env.local' })

app = express()

app.use(express.json())

app.use('/product', productRouter)

app.listen(process.env.PORT || 3000, () => console.log(`💡 Server started listening on port ${ process.env.PORT }`))