const mongoose = require('mongoose')

const goalSchema = mongoose.Schema({
    user: {
        // kad imamo _id kad kreiramo novi resurs to je object id
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    text: {
        type: String,
        required: [true, 'Please add a text value']
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Goal', goalSchema)