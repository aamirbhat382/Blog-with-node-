const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    articleSlug: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Comment', commentSchema)