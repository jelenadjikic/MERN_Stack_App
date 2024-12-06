const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @desc Register new user - client 
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {

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
        role: 'client' 
    })

    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id), 
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
    
})

// @desc Authenticate user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
   
    const {email, password} = req.body
    if(!email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    // Check if user with email exists and compare passwords
    const user = await User.findOne({email})
    if(user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

// @desc Get user data
// @route GET /api/users/me
// @access Private
const getMe = asyncHandler(async (req, res) => {
    res.status(200).json(req.user)
})

// @desc Update user
// @route POST /api/users/updateUser
// @access Private
const updateUser = asyncHandler(async (req, res) => {

    // Find property
    const user = await User.findById(req.params.id)
    if(!user){
        res.status(400)
        throw new Error('User not found!')
    }

    // Update property
    const updatedUser= await User.findByIdAndUpdate(req.params.id, req.body, {new: true})
    
    res.status(200).json(updatedUser)
})

// @desc Change password
// @route POST /api/users/changePassword
// @access Private
const changePassword = asyncHandler(async (req, res) => {

    // Find user
    const user = await User.findById(req.params.id)
    if(!user){
        res.status(400)
        throw new Error('User not found!')
    }
    
    // Old password and New password from body (form)
    const {oldPassword, newPassword} = req.body

    if(user && (await bcrypt.compare(oldPassword, user.password))){
        // Hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(newPassword, salt)

        // Update password
        const updatedUser= await User.findByIdAndUpdate(req.params.id, {password: hashedPassword}, {new: true})
        res.status(200).json(updatedUser)
    }
    else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
    
})

// Generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}






module.exports = {
    registerUser,
    loginUser,
    getMe,
    updateUser,
    changePassword,
    generateToken
}



