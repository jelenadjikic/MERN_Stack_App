import axios from 'axios'

// route
const API_URL = '/api/users/'

// Get owners
const getOwners = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + 'owners', config)

    return response.data
}

// Delete owner
const deleteOwner = async (ownerId, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.delete(API_URL + ownerId, config)
  
    return response.data
  }

const ownerService = {
    getOwners,
    deleteOwner
}

export default ownerService
