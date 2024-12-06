const mongoose = require('mongoose')

const answerSchema = mongoose.Schema({
    // Ref to the question
    question: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Question'
    },
    nickname:{
        type: String,
        required: [true, 'Please add a nickname value']
    },
    title: {
        type: String,
        required: [true, 'Please add a title value']
    },
    text: {
        type: String,
        required: [true, 'Please add a text value']
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Answer', answerSchema)