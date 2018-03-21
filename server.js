require("dotenv").config()

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const logger = require('morgan')

const app = express()

mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI)

const connection = mongoose.connection
connection.on('connected', () => {
    console.log('Mongoose Connected Successfully')
})

// If the connection throws an error
connection.on('error', (err) => {
    console.log('Mongoose default connection error: ' + err)
})


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client/build/index.html')
})
app.use(express.static(__dirname + '/client/build/'))
app.use(logger('dev'))
app.use(bodyParser.json())

const UsersController = require('./routes/users')
app.use('/api/users', UsersController)

app.get('/', (req, res) => {
    res.send('Hello world!')
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log("Magic happening on port " + PORT)
})
