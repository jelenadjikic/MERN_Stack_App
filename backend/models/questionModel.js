const mongoose = require('mongoose')

const questionSchema = mongoose.Schema({
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

module.exports = mongoose.model('Question', questionSchema)