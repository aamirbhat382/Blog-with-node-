const Articals = require("../../../models/airtical")

function homeController() {
    return {
        index: (req, res) => {
            Articals.find({}, null, { sort: { 'createdAt': -1 } }).then((artical) => {
                // console.log(artical)
                return res.status(200).render('blog/home', { articals: artical })
            }).catch(err => {
                console.log(err)
            })

        },
        next(req, res) {
            res.render('blog/projects')
        },
        contact(req, res) {
            res.render("blog/contact")
        },
        about(req, res) {
            res.render('blog/about')
        }
    }
}

module.exports = homeController