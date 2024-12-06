const express = require('express')
const router = express.Router()
const { 
    registerUser, 
    loginUser,
    getMe,
    updateUser,
    changePassword
} = require('../controllers/userController')

const {
    registerOwner,
    getAllOwners,
    deleteOwner,
} = require('../controllers/ownerController')

// Protecting routes using middleware
const { protect, isAdmin } = require('../middleware/authMiddleware')

// ---------------------------- ROUTES --------------------------------
// Public routes
router.post('/register', registerUser)
router.post('/login', loginUser)

// Protected route that only owner can see
router.get('/dashboard', protect, getMe) // protected route

// Protected routes that only admin can access
router.post('/addOwner', isAdmin, registerOwner) // only admin can see this
router.get('/owners', isAdmin, getAllOwners) // only admin can see this
router.delete('/:id', isAdmin, deleteOwner)


// PUT
router.put('/updateUser/:id', protect, updateUser)

// PUT
router.put('/changePassword/:id', protect, changePassword)

module.exports = router