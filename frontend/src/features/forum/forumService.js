import axios from 'axios'

// route
const API_URL = '/api/forum/'

// Get questions
const getQuestions = async () => {
    
    const response = await axios.get(API_URL + 'getQuestions')
    return response.data
}

// Get answers
const getAnswers = async () => {
    
    const response = await axios.get(API_URL + 'getAnswers')
    return response.data
}

// Create new question
const createQuestion = async (questionData) => {
  
    const response = await axios.post(API_URL + 'setQuestion', questionData)
    return response.data
}

// Create new answer
const createAnswer = async (answerData) => {
  
    const response = await axios.post(API_URL + 'setAnswer', answerData)
    return response.data
}

// Delete question
const deleteQuestion = async (questionId, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.delete(API_URL + "deleteQuestion/" + questionId, config)
  
    return response.data
  }

  
// Delete question
const deleteAnswer = async (answerId, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.delete(API_URL + "deleteAnswer/" + answerId, config)
  
    return response.data
}

const forumService = {
    getQuestions,
    getAnswers,
    createQuestion,
    createAnswer,
    deleteQuestion,
    deleteAnswer
}
export default forumService
