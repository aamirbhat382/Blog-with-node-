const e = require('express')
const Article = require('../../../models/airtical')
    // const comment = require('../../../models/comment')
const Comment = require('../../../models/comment')

function articleController() {
    return {
        showOne: async(req, res) => {
            const article = await Article.findOne({ slug: req.params.slug })
            try {
                if (article == null) res.redirect('/')
                const Allarticle = await Article.find({}, null, { sort: { 'createdAt': 1 } })
                const comment = await Comment.find({ articleSlug: req.params.slug }, null, { sort: { 'createdAt': -1 } }).populate('customerId', '-password').exec((err, comment) => {
                    if (req.xhr) {
                        return res.json(comment)
                    } else {

                        return res.render('articles/show', { article: article, Allarticle: Allarticle })
                    }
                })
            } catch (e) {
                req.flesh('error', 'Something Want To Wrong')
                console.log(e)
            }

            // const latest_article = await Article.find({})


        }
    }
}

module.exports = articleController