// Service is strictly for just making the http req and sending the data back, 
// and setting any data in local storage

// For http req, like we made req with postman now we use axios within our app
import axios from 'axios'

// route
const API_URL = '/api/properties/'

// Create new property
const createProperty = async (propertyData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, propertyData, config)

    return response.data
}

// Get properties
const getProperties = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config)

    return response.data
}

// Get properties
const getAllProperties = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL + "/allProperties", config)

    return response.data
}

// Delete property
const deleteProperty = async (propertyId, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.delete(API_URL + propertyId, config)
  
    return response.data
  }

// Update property
const updateProperty = async (propertyId, propertyData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    console.log("DATA U SERVISU" +  propertyData)

    const response = await axios.put(API_URL + propertyId, propertyData, config)
    console.log( "U SERVISU "  + response)

    return response.data
}


const propertyService = {
    createProperty,
    getProperties,
    getAllProperties,
    deleteProperty,
    updateProperty
}
export default propertyService
