const asyncHandler = require('express-async-handler')
const Property = require('../models/propertyModel')
const User = require('../models/userModel')

// @desc Get properties
// @route GET /api/properties
// @access Private
const getPropertiesFromOwner = asyncHandler(async (req, res) => {
    // Returns all properties from user with id : req.user.id
    const property = await Property.find({ user: req.user.id })
    res.status(200).json(property)
})

// @desc Get properties
// @route GET /api/properties
// @access Private
const getAllProperties = asyncHandler(async (req, res) => {
    // Returns all properties 
    const property = await Property.find()
    res.status(200).json(property)
})


// @desc Set property
// @route POST /api/properties
// @access Private
const setProperty = asyncHandler(async (req, res) => {
    const {name, location, description, price, photo} = req.body
    if(!name || !location || !description || !price || !photo) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    const property = await Property.create({
        user: req.user.id,
        name: req.body.name,
        location: req.body.location,
        description: req.body.description,
        price: req.body.price,
        photo: req.body.photo,
    })
    

    res.status(200).json(property)
})

// @desc Update property
// @route PUT /api/properties/:id
// @access Private
const updateProperty = asyncHandler(async (req, res) => {

    // Find property
    const prop = await Property.findById(req.params.id)
    if(!prop){
        res.status(400)
        throw new Error('Property not found!')
    }

    // Check for user
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the property user
    if(prop.user.toString() != req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    // Update property
    const updatedProperty = await Property.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json({updatedProperty: updatedProperty })
})

// @desc Delete property
// @route DELETE /api/properties/:id
// @access Private
const deleteProperty = asyncHandler(async (req, res) => {

    // Find property
    const prop = await Property.findById(req.params.id)
    if(!prop){
        res.status(400)
        throw new Error('Property not found!')
    }

    // Check for user
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the property user
    if(prop.user.toString() != req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    const deletedProperty = await Property.findByIdAndDelete(req.params.id)
    res.status(200).json({id: req.params.id})
})

module.exports = {
    getPropertiesFromOwner,
    getAllProperties,
    setProperty,
    updateProperty,
    deleteProperty
}