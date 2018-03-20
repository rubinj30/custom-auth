const express = require('express')
const User = require('../db/models/User')

const router = express.Router()

router.get('/', async (request, response) => {
    try {
        const users = await User.find({})
        if (!users) {
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

module.exports = router