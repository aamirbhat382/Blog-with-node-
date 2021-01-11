const Comment = require('../../../models/comment')


function commentController() {
    return {
        comment: (req, res) => {
            // console.log(req.user)
            // console.log(req.params.id)
            const { comment } = req.body
            if (!comment) {
                console.log("comment")
            }
            const new_comment = new Comment({
                customerId: req.user._id,
                articleSlug: req.params.slug,
                comment
            })
            new_comment.save().then(result => {
                Comment.populate(result, { path: 'customerId' }, (err) => {
                    return res.redirect(`/article/${req.params.slug}`)

                })
            }).catch(e => {
                console.log(e)
            })
        }
    }
}
module.exports = commentController