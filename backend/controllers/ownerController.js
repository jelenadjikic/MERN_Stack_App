const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @desc Register new user - owner
// @route POST /api/users
// @access Public
const registerOwner = asyncHandler(async (req, res) => {

    const {name, email, password} = req.body
    if(!name || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    // Check if user exists
    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role: 'owner' 
    })

    if(user){
        res.status(201).json({
            name: user.name,
            role: user.role,
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
    
})

// @desc Get user data
// @route GET /api/users/me
// @access Private
const getOwnerInfo = asyncHandler(async (req, res) => {
    res.status(200).json(req.user)
})

// @desc Get user data
// @route GET /api/users/me
// @access Private
const getAllOwners = asyncHandler(async (req, res) => {
    // Returns all users that have a role owner
    const owners = await User.find({ role: 'owner'})
    res.status(200).json(owners)
})

// @desc Delete owner
// @route DELETE /api/users/:id
// @access Private
const deleteOwner = asyncHandler(async (req, res) => {

    // Find owner
    const owner = await User.findById(req.params.id)
    if(!owner){
        res.status(400)
        throw new Error('User not found!')
    }

    const deletedOwner = await User.findByIdAndDelete(req.params.id)
    res.status(200).json({id: req.params.id})
})


// Generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = {
    registerOwner,
    getOwnerInfo,
    getAllOwners,
    generateToken,
    deleteOwner
}
