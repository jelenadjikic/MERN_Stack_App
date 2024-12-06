// Service is strictly for just making the http req and sending the data back, 
// and setting any data in local storage

// For http req, like we made req with postman now we use axios within our app
import axios from 'axios'

// route
const API_URL = '/api/goals/'

// Create new goal
const createGoal = async (goalData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, goalData, config)

    return response.data
}

// Get goals
const getGoals = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config)

    return response.data
}

// Delete user goal
const deleteGoal = async (goalId, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.delete(API_URL + goalId, config)
  
    return response.data
  }

const goalService = {
    createGoal,
    getGoals,
    deleteGoal
}
export default goalService
