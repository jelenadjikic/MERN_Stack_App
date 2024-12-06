const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// Protect routes - autorization
const protect = asyncHandler (async (req, res, next) => {
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
        try {
            // Get token from header 
            token = req.headers.authorization.split(' ')[1]

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // Get user from token
            req.user = await User.findById(decoded.id).select('-password')

            next()
        } catch (error) {
            console.log(error)
            // User not authorized
            res.status(401)
            throw new Error('Not authorized')
        }

        if(!token){
            res.status(401)
            throw new Error('Not authorized, no token')
        }
})

// Protect routes - admin
const isAdmin = asyncHandler (async (req, res, next) => {
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
        try {
            // Get token from header 
            token = req.headers.authorization.split(' ')[1]

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // Get user from token
            req.user = await User.findById(decoded.id).select('-password')

            if(req.user && req.user.role !== 'admin'){
                res.status(401)
                throw new Error('Access denied, you must be an admin')
            }
            next()
            
        } catch (error) {
            console.log(error)
            // User not authorized
            res.status(401)
            throw new Error('Not authorized')
        }

        if(!token){
            res.status(401)
            throw new Error('Not authorized, no token')
        }
})

// Protect routes - owner
const isOwner = asyncHandler (async (req, res, next) => {
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
        try {
            // Get token from header 
            token = req.headers.authorization.split(' ')[1]

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // Get user from token
            req.user = await User.findById(decoded.id).select('-password')

            console.log(req.user)

            if(req.user && req.user.role !== 'owner'){
                res.status(401)
                throw new Error('Access denied, you must be an admin')
            }
            next()
            
        } catch (error) {
            console.log(error)
            // User not authorized
            res.status(401)
            throw new Error('Not authorized')
        }

        if(!token){
            res.status(401)
            throw new Error('Not authorized, no token')
        }
})

// Protect routes - client
const isClient = asyncHandler (async (req, res, next) => {
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
        try {
            // Get token from header 
            token = req.headers.authorization.split(' ')[1]

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // Get user from token
            req.user = await User.findById(decoded.id).select('-password')

            if(req.user && req.user.role !== 'client'){
                res.status(401)
                throw new Error('Access denied, you must be a client')
            }
            next()
            
        } catch (error) {
            console.log(error)
            // User not authorized
            res.status(401)
            throw new Error('Not authorized')
        }

        if(!token){
            res.status(401)
            throw new Error('Not authorized, no token')
        }
})

module.exports = {
    protect,
    isAdmin,
    isOwner,
    isClient
}
