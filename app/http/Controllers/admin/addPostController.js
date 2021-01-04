const Article = require('../../../models/airtical')

function addPostController() {
    return {
        index(req, res) {
            res.status(200).render('admin/post')
        },
        add: (req, res) => {
            // console.log(req.body)
            const { title, description, markdown } = req.body
            article = new Article({
                title,
                description,
                markdown
            })
            article.save().then(result => {
                // console.log(result)
                return res.redirect("/")
            }).catch(e => {
                console.log(e)
            })
        },
        profile(req, res) {
            res.render('admin/profile')
        }

    }
}

module.exports = addPostController