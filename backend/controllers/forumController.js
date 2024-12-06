const asyncHandler = require('express-async-handler')
const Question = require('../models/questionModel')
const Answer = require('../models/answerModel')
const User = require('../models/userModel')

// @desc Get all questions 
// @route GET /api/forum
// @access Private
const getAllQuestions= asyncHandler(async (req, res) => {

    // Gets all questions
    const questions = await Question.find().sort({ createdAt: -1 })
    
    res.status(200).json(questions)
})

// @desc Get all answers
// @route GET /api/forum
// @access Private
const getAllAnswers= asyncHandler(async (req, res) => {

    const answers = await Answer.find().sort({ createdAt: 1 })
    res.status(200).json(answers)
})

// @desc Get all answers from concrete question
// @route GET /api/forum
// @access Private
const getAllAnswersFromQuestion= asyncHandler(async (req, res) => {

    const answers = await Answer.find({ question: req.params.questionId })
    res.status(200).json({answers: answers})
})

// @desc Set Question
// @route POST /api/forum
// @access Private
const setQuestion = asyncHandler(async (req, res) => {
    const {nickname, title, text} = req.body

    if(!nickname || !title || !text) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    const question = await Question.create({
       nickname: req.body.nickname,
       title: req.body.title,
       text: req.body.text,
    })

    res.status(200).json(question)
})


// @desc Set answer
// @route POST /api/forum
// @access Private
const setAnswer = asyncHandler(async (req, res) => {
    const {questionId, nickname, title, text} = req.body

    if(!questionId  ||!nickname || !title || !text) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    const answer = await Answer.create({
        question: questionId,
        nickname: req.body.nickname,
        title: req.body.title,
        text: req.body.text,
    })

    res.status(200).json(answer)
})


// @desc Delete question
// @route DELETE /api/forum/:id
// @access Private
const deleteQuestion = asyncHandler(async (req, res) => {

    // Find question
    const question = await Question.findById(req.params.id)
    if(!question){
        res.status(400)
        throw new Error('Question not found!')
    }

    // Delete question
    const deletedQuestion = await Question.findByIdAndDelete(req.params.id)

    res.status(200).json({id: req.params.id})
})


// @desc Delete answer
// @route DELETE /api/forum/:id
// @access Private
const deleteAnswer = asyncHandler(async (req, res) => {

    // Find answer
    const answer = await Answer.findById(req.params.id)
    if(!answer){
        res.status(400)
        throw new Error('Answer not found!')
    }

    const deletedAnswer = await Answer.findByIdAndDelete(req.params.id)
    res.status(200).json({id: req.params.id})
})

module.exports = {
    getAllQuestions,
    getAllAnswers,
    getAllAnswersFromQuestion,
    setQuestion,
    setAnswer,
    deleteQuestion,
    deleteAnswer
}