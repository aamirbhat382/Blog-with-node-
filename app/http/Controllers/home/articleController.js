const Article = require('../../../models/airtical')
    // const comment = require('../../../models/comment')
const Comment = require('../../../models/comment')

function articleController() {
    return {
        showOne: async(req, res) => {
            const article = await Article.findOne({ slug: req.params.slug })
            if (article == null) res.redirect('/')
                // const latest_article = await Article.find({})
            const comment = await Comment.find({ articleSlug: req.params.slug }, null, { sort: { 'createdAt': -1 } }).populate('customerId', '-password').exec((err, comment) => {
                if (req.xhr) {
                    return res.json(comment)
                } else {

                    return res.render('articles/show', { article: article }, )
                }
            })

        }
    }
}

module.exports = articleController