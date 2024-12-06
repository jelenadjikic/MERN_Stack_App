const mongoose = require('mongoose')

const propertySchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    location: {
        type: String,
        required: [true, 'Please add a location']
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    price: {
        type: String,
        required: [true, 'Please add a price']
    },
    photo: {
        type: String,
        required: [true, 'Please add a text value']
    },
    
},{
    timestamps: true
})

module.exports = mongoose.model('Property', propertySchema)