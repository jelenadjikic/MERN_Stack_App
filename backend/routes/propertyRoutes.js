const express = require('express')
const router = express.Router()
const { 
    getPropertiesFromOwner,
    getAllProperties,
    setProperty,
    updateProperty,
    deleteProperty
} = require('../controllers/propertyController')

// Protecting routes, authorization
const { isOwner, isClient } = require('../middleware/authMiddleware')

// GET
router.get('/', isOwner, getPropertiesFromOwner)

// GET
router.get('/allProperties', isClient, getAllProperties)

// POST
router.post('/', isOwner, setProperty)

// PUT
router.put('/:id', isOwner, updateProperty)

// DELETE
router.delete('/:id', isOwner, deleteProperty)

module.exports = router