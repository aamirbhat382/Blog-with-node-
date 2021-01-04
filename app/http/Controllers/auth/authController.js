const User = require("../../../models/auth/userModel")
const bcrypt = require('bcryptjs')
const passport = require('passport')

function authController() {
    return {
        login(req, res) {
            res.render('auth/login')
        },
        // Login
        loginPost: (req, res, next) => {
            const { email, password } = req.body
            if (!email || !password) {
                req.flash('error', 'All fields are required')
                return res.redirect('/login')
            }
            passport.authenticate('local', (err, user, info) => {
                if (err) {
                    req.flash('error', info.message)
                    return next(err)
                }
                if (!user) {
                    req.flash('error', info.message)
                    return res.redirect('/login')
                }
                req.logIn(user, (err) => {
                    if (err) {
                        req.flesh('error', info.message)
                        return next(err)
                    }

                    return res.redirect("/")
                })
            })(req, res, next)
        },
        register(req, res) {
            res.render("auth/register")
        },
        registerPost: async(req, res, ) => {
            // console.log(req.body)
            // Validate request
            const { name, email, password } = req.body;
            if (!name || !email || !password) {
                req.flash('error', 'All fields are required')
                req.flash('name', name)
                req.flash('email', email)
                return res.redirect("/register")
            }
            // Check If email Already exists
            User.exists({ email: email }, (err, result) => {
                    if (result) {
                        req.flash('error', 'Email already taken')
                        req.flash('name', name)
                        req.flash('email', email)
                        return res.redirect("/register")
                    }
                })
                // Hash Password 
            const hashedPassword = await bcrypt.hash(password, 10)
            const user = new User({
                name,
                email,
                password: hashedPassword
            })
            user.save().then(result => {
                return res.redirect('/login')
            }).catch(e => {

            })
        }
    }
}
module.exports = authController