const express = require('express')
const User = require('../db/models/User')

const router = express.Router()

router.get('/', async (request, response) => {
    try {
        const users = await User.find({})
        if (users.length < 1) {
            response.json({error: "No users found"})
        }
        else {
            response.json(users)
        }
    }
    catch (err) {
        console.log(err)
    }
})

router.get('/:id', async (request, response) => {
    try {
        const user = await User.findById(request.params.id)
        if (!user) {
            response.json({error: "No user found"})
        }
        else {
            response.json(user)
        }
    }
    catch (err) {
        console.log(err)
    }
})

router.post('/', async (request, response) => {
    try {
        const email = await User.find({'emailAddress': request.body.emailAddress})
        if (email.length < 1) {
            const newUser = await User.create(request.body)
            newUser.save()
            response.json({
                newUser,
                redirectToProfile: true
            })
        } else {
            console.log("ELSE");
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
        const updatedUserInfo = await User.findByIdAndUpdate(request.params.userId, request.body, {new: true})
        response.json(updatedUserInfo)
    }
    catch (err) {
        console.log(err)
        response.sendStatus(500)
    }
})

module.exports = router