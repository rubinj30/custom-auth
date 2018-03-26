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

router.post('/login', async (request, response) => {
    try {
        const user = await User.find({ 'emailAddress': request.body.emailAddress })
        if (user.length < 1) {
            response.json({error: "That e-mail does not belong to a user"})
        } else if (bcrypt.compareSync(request.body.password, user[0].password)) {
            response.json({
                emailAddress: request.body.emailAddress,
                redirectToProfile: true
            })
        } else {
            response.json({ error: "The password is incorrect. Please try again." })
        }
    } catch (err) {
        console.log(err)
    }
})

router.get('/:emailAddress', async (request, response) => {
    try {
        const user = await User.find({ 'emailAddress': request.params.emailAddress })
        if (user.length < 1) {
            response.json({ error: "No user found" })
        }
        else {
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

router.delete('/:emailAddress', async (request, response) => {
    try {
        const user = await User.findOneAndRemove({emailAddress: request.params.emailAddress})
        response.json(user)
    }
    catch (err) {
        console.log(err)
    }
})

router.patch('/', async (request, response) => {
    try {
        const user = await User.findOneAndUpdate({ 'emailAddress': request.body.originalEmailAddress }, request.body.user, { new: true })
        response.json(user)
    }
    catch (err) {
        console.log(err)
        response.sendStatus(500)
    }
})

module.exports = router