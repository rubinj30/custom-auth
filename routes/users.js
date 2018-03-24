const express = require('express')
const User = require('../db/models/User')
var bcrypt = require('bcrypt')
const saltRounds = 10

const router = express.Router()

router.get('/', async (request, response) => {
    try {
        const users = await User.find({})
        if (users.length < 1) {
            response.json({ error: "No users found" })
        }
        else {
            response.json(users)
        }
    }
    catch (err) {
        console.log(err)
    }
})

router.get('/:emailAddress', async (request, response) => {
    try {
        // console.log(request.params.emailAddress)
        const user = await User.find({ 'emailAddress': request.params.emailAddress })
        console.log("USER", user);
        if (user.length < 1) {
            response.json({ error: "No user found" })
        }
        else {
            // bcrypt.compare(myPlaintextPassword, hash, function(err, res) {
            //     // res == true
            // });
            // bcrypt.compare(someOtherPlaintextPassword, hash, function(err, res) {
            //     // res == false
            // });
            response.json(user[0])
        }
    }
    catch (err) {
        console.log(err)
    }
})

router.post('/', async (request, response) => {
    try {
        const email = await User.find({ 'emailAddress': request.body.emailAddress })
        if (email.length < 1) {
            console.log(request.body.password)
            bcrypt.hash(request.body.password, saltRounds, async (err, hash) => {
                const user = {
                    firstName: request.body.firstName,
                    lastName: request.body.firstName,
                    emailAddress: request.body.emailAddress,
                    phoneNumber: request.body.phoneNumber,
                    password: hash
                }

                const newUser = await User.create(user)
                newUser.save()
                response.json({
                    newUser,
                    redirectToProfile: true
                })
            })
        }
        else {
            response.json({ error: 'That e-mail addresss is already in use' })
        }
    }
    catch (err) {
        console.log(err)
    }
})

router.delete('/:userId', async (request, response) => {
    try {
        const user = await User.findByIdAndRemove(request.params.userId)
        response.send(user)
    }
    catch (err) {
        console.log(err)
    }
})

router.patch('/:userId', async (request, response) => {
    try {
        const updatedUserInfo = await User.findByIdAndUpdate(request.params.userId, request.body, { new: true })
        response.json(updatedUserInfo)
    }
    catch (err) {
        console.log(err)
        response.sendStatus(500)
    }
})

module.exports = router