const mongoose = require('mongoose')

const reservationSchema = mongoose.Schema({
    // user is client that sent request for property for date and time
    client: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    property: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Property'
    },
    date:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true 
    },
    approved: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Reservation', reservationSchema)