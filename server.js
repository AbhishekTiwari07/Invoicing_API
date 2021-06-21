const express = require('express')
const invoice = require('./router/invoice')
require('./db/connect')
require('dotenv').config()
const app = express()

const PORT = process.env.PORT || 3001

app.use(express.json())
app.use('/invoice', invoice)

app.listen(PORT)