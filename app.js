require('dotenv').config()
const express = require('express');
const app = express()
const ejs = require('ejs')
const expressLayout = require("express-ejs-layouts")
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session')
const flash = require('express-flash')
const MongoDbStore = require('connect-mongo')(session)
const passport = require('passport')
const methodOverride = require('method-override')
const PORT = process.env.PORT || 80


// Database connection
mongoose.connect(process.env.MONGO_CONNECTION_URL, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: true, useFindAndModify: false });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Database connected...');
}).catch(err => {
    console.log('Connection failed...')
});
// Session Store
let mongoStore = new MongoDbStore({
    mongooseConnection: connection,
    collection: 'sessions'
})

app.use(session({
    secret: process.env.COOKE_SECRET,
    resave: false,
    store: mongoStore,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 24 hour
}))



app.use(flash())

// Passport config
const passportInit = require('./app/config/passport')
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())

// set Template engine
app.use(expressLayout)
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(methodOverride('_method'))
app.use((req, res, next) => {
        res.locals.session = req.session
        res.locals.user = req.user
        next()
    })
    //  Static Files
app.use(express.static('public'))

// All routes
require("./routes/web")(app)
app.use((req, res) => {
    res.status(404).render('errors/404')
})


app.listen(PORT, () => {
    console.log(`Server Started at port ${PORT}`)
})