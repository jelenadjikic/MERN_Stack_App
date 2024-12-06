const express = require('express')
const router = express.Router()
const { 
    getAllReservations,
    getApprovedReservations,
    getUnapprovedReservations,
    setReservation,
    approveReservation,
    deleteReservation,
    getMyReservations,
    cancelReservation,
    getAllReservationsForProperty
} = require('../controllers/reservationController')

// Protecting routes, authorization
const { isOwner, isClient, protect } = require('../middleware/authMiddleware')

// GET
router.get('/getUnapprovedReservations', isOwner, getUnapprovedReservations)

// GET
router.get('/getApprovedReservations', isOwner, getApprovedReservations)

// GET
router.get('/getMyReservations', isClient, getMyReservations)

// GET
router.get('/getAllReservations', protect, getAllReservations)

// GET
router.get('/getAllReservationsForProperty/:id', protect, getAllReservationsForProperty)

// POST
router.post('/setReservation', isClient, setReservation)

// PUT
router.put('/approveReservation/:id', isOwner, approveReservation)

// DELETE
router.delete('/deleteReservation/:id', isOwner, deleteReservation)

// DELETE
router.delete('/cancelReservation/:id', isClient, cancelReservation)

module.exports = router