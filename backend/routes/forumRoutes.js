const express = require('express')
const router = express.Router()
const { 
    getAllQuestions,
    getAllAnswers,
    getAllAnswersFromQuestion,
    setQuestion,
    setAnswer,
    deleteQuestion,
    deleteAnswer
} = require('../controllers/forumController')
const { isAdmin } = require('../middleware/authMiddleware')

// GET
router.get('/getQuestions', getAllQuestions)

// GET
router.get('/getAnswers', getAllAnswers)

// POST
router.post('/setQuestion', setQuestion )

// POST
router.post('/setAnswer', setAnswer )

// DELETE
router.delete('/deleteQuestion/:id', isAdmin, deleteQuestion)

// DELETE
router.delete('/deleteAnswer/:id', isAdmin, deleteAnswer)

module.exports = router