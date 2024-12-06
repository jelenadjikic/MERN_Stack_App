const express = require('express')
const router = express.Router()
const { 
    getGoals, 
    setGoal, 
    updateGoal, 
    deleteGoal 
} = require('../controllers/goalController')

// Protecting routes, authorization
const { protect } = require('../middleware/authMiddleware')

// GET
router.get('/', protect, getGoals)

// POST
router.post('/', protect, setGoal)

// PUT
router.put('/:id', protect, updateGoal)

// DELETE
router.delete('/:id', protect, deleteGoal)

module.exports = router