require("dotenv").config()

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const logger = require('morgan')
const passport = require('passport');
const Strategy = require('passport-local').Strategy;


passport.use(new Strategy(
    function (username, password, cb) {
        db.users.findByUsername(username, function (err, user) {
            if (err) { return cb(err); }
            if (!user) { return cb(null, false); }
            if (user.password != password) { return cb(null, false); }
            return cb(null, user);
        });
    }));
passport.serializeUser(function (user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {
    db.users.findById(id, function (err, user) {
        if (err) { return cb(err); }
        cb(null, user);
    });
});

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
app.use(require('cookie-parser')());
// app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

const UsersController = require('./routes/users')
app.use('/api/users', UsersController)

app.get('/', (req, res) => {
    res.send('Hello world!')
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log("Magic happening on port " + PORT)
})
