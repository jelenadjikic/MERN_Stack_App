// authService is strictly for just making the http req and sending the data back, 
// and setting any data in local storage

// For http req, like we made req with postman now we use axios within our app
import axios from 'axios'

// route
const API_URL = '/api/users/'

// Register user
const register = async (userData) => {
    // Makes a  post request to route /api/users/ and puts a response into variable response
    const response = await axios.post(API_URL + 'register', userData)

    // If data in response is filled, we set localStorage user to that data
    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

// Register owner - userData is from form
const registerOwner = async (userData, token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    // Makes a  post request to route /api/users/ and puts a response into variable response
    const response = await axios.post(API_URL + 'addOwner', userData,  config)
    
    return response.data
}

// Login user
const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData)
  
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data))
    }
  
    return response.data
}

// Logout user
const logout = () => {
    localStorage.removeItem('user')
}

// Update user
const updateUser = async (userData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.put(API_URL + 'updateUser/'+ userData.id, userData, config)

    return response.data
}

const changePassword = async (userData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.put(API_URL + 'changePassword/'+ userData.id, userData, config)

    return response.data
}


const authService = {
    register,
    registerOwner,
    login,
    logout,
    updateUser,
    changePassword
}

export default authService