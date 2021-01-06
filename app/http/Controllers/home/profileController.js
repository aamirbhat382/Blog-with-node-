const Comment = require('../../../models/comment')

function profileController() {
    return {
        profile: async(req, res) => {
            // console.log()
            const comment = await Comment.find({ customerId: req.user._id })
                // console.log(comment)
            res.render('blog/profile', { comment: comment })

        }
    }
}
module.exports = profileController