const homeController = require("../app/http/Controllers/home/homeController")
const articelController = require("../app/http/Controllers/home/articleController")
const addPostController = require("../app/http/Controllers/admin/addPostController")
const authController = require("../app/http/Controllers/auth/authController")
const editController = require("../app/http/Controllers/admin/editController")
const commentController = require("../app/http/Controllers/home/commentController")
const profileController = require("../app/http/Controllers/home/profileController")
    // Middlawers
const guest = require('../app/http/middlawers/guest')
const admin = require('../app/http/middlawers/admin')

function init(app) {
    //Home Routs
    app.get('/', homeController().index)
        // Contact and About
    app.get('/contact', homeController().contact)
    app.get('/about', homeController().about)
        // Article Routes
    app.get("/article/:slug", articelController().showOne)
    app.post("/article/comment/:slug", commentController().comment)

    // Admin Post Routs
    app.get("/admin/post", admin, addPostController().index)
    app.get("/admin/profile", addPostController().profile)
    app.post("/admin/post", addPostController().add)
        // Edit Admin Route
    app.get("/admin/edit/:id", admin, editController().index)
    app.get("/admin/delete/:id", admin, editController().deleteOne)
    app.put("/admin/update/:id", admin, editController().update)

    // Auth  Register Routs
    app.get('/register', guest, authController().register)
    app.post('/register', authController().registerPost)
        // Auth  Login Routs
    app.get('/login', guest, authController().login)
    app.post('/login', authController().loginPost)
        // User Profile Page
    app.get('/profile', profileController().profile)
}

module.exports = init