require('dotenv').config()

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI)

const User = require('./models/User')

const jonathan = new User({
    firstName: 'Jonathan',
    lastName: 'Rubin',
    phoneNumber: '7705551212',
    emailAddress: 'jonathan@test.com',
    password: 'password'
})

const mike = new User({
    firstName: 'Mike',
    lastName: 'Jordan',
    phoneNumber: '4045551212',
    emailAddress: 'mike@test.com',
    password: 'password'
})

User.remove({})
    .then(() => jonathan.save())
    .then(() => mike.save())
    .then(() => console.log('SEEDED DATABASE'))
    .then(() => mongoose.connection.close())