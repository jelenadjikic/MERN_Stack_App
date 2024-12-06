const asyncHandler = require('express-async-handler')
const Reservation = require('../models/reservationModel')
const User = require('../models/userModel')

// @desc Get Unapproved Reservations 
// @route GET /api/reservations
// @access Private
const getUnapprovedReservations = asyncHandler(async (req, res) => {
    
    // sa populate se uzimaju podaci referenciranih podataka
    const reservations = await Reservation.find({ approved: false, owner : req.user.id })
                                           .populate('client', 'name')
                                           .populate('property', 'name')
                                           .sort({ date: 1 })
                                           .sort({ time:1 })

    res.status(200).json(reservations)
})

// @desc Get Approved Reservations 
// @route GET /api/reservations
// @access Private
const getApprovedReservations = asyncHandler(async (req, res) => {
    
    const reservations = await Reservation.find({ approved: true, owner : req.user.id })
                                            .populate('client', 'name')
                                            .populate('property', 'name')
                                            .sort({ date: 1 })
                                            .sort({ time: 1 })
    res.status(200).json(reservations)
})

// @desc Get Approved Reservations 
// @route GET /api/reservations
// @access Private
const getMyReservations = asyncHandler(async (req, res) => {
    
    const reservations = await Reservation.find({ client : req.user.id })
                                            .populate('owner', 'name')
                                            .populate('property', 'name')
                                            .sort({ date: 1 })
                                            .sort({ time: 1 })
    res.status(200).json(reservations)
})

// @desc Get all reservations
// @route GET /api/reservations
// @access Private
const getAllReservations = asyncHandler(async (req, res) => {

    const reservations = await Reservation.find()
    res.status(200).json(reservations)
})


// @desc Get all reservations
// @route GET /api/reservations
// @access Private
const getAllReservationsForProperty = asyncHandler(async (req, res) => {

    const reservations = await Reservation.find({property: req.params.id})
    res.status(200).json(reservations)
})


// @desc Set reservation
// @route POST /api/reservations
// @access Private
const setReservation = asyncHandler(async (req, res) => {

    const {date, time, propertyId, ownerId} = req.body
    if(!date || !time || !propertyId || !ownerId) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    const doesReservationAlreadyExist = await Reservation.findOne({date: date, time: time, property: propertyId, owner: ownerId})
    
    if(!doesReservationAlreadyExist)
    { 
        const reservation = await Reservation.create({
            client: req.user.id,
            owner: req.body.ownerId,
            property: req.body.propertyId,
            date: req.body.date,
            time: req.body.time,
            approved: false,
        })

        res.status(200).json(reservation)
    }
    else {
        res.status(400)
        console.log("Already reserved")
        throw new Error('You cannot reserve this date and time beacuse it is not available!')
    }
    
})

// @desc Approve reservation
// @route PUT /api/reservations/:id
// @access Private
const approveReservation= asyncHandler(async (req, res) => {

    const reservation = await Reservation.findById(req.params.id)
    if(!reservation){
        res.status(400)
        throw new Error('Reservation not found!')
    }

    // Check for user
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the goal user
    if(reservation.owner.toString() != req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    // Approve reservation
    const approvedReservation = await Reservation.findByIdAndUpdate(req.params.id, {approved: true}, {new: true})
    res.status(200).json({id: req.params.id})
})

// @desc Delete Reservation
// @route DELETE /api/reservations/:id
// @access Private
const deleteReservation = asyncHandler(async (req, res) => {

    const reservation = await Reservation.findById(req.params.id)
    if(!reservation){
        res.status(400)
        throw new Error('Reservation not found!')
    }
    // Check for user
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the goal user
    if(reservation.owner.toString() != req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    const deletedReservation = await Reservation.findByIdAndDelete(req.params.id)
    res.status(200).json({id: req.params.id})
})

// @desc Cancel Reservation
// @route DELETE /api/reservations/:id
// @access Private
const cancelReservation = asyncHandler(async (req, res) => {

    const reservation = await Reservation.findById(req.params.id)
    if(!reservation){
        res.status(400)
        throw new Error('Reservation not found!')
    }
    if(reservation.approved)
    {
        res.status(400)
        throw new Error('Reservation approved, you cannot cancel it!')
    }
    // Check for user
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the goal user
    if(reservation.client.toString() != req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    const canceledReservation = await Reservation.findByIdAndDelete(req.params.id)
    res.status(200).json({id: req.params.id})
})


module.exports = {
    getUnapprovedReservations,
    getApprovedReservations,
    getMyReservations,
    getAllReservations,
    getAllReservationsForProperty,
    setReservation,
    approveReservation,
    deleteReservation,
    cancelReservation
}