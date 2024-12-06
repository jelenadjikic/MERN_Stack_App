import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import forumService from './forumService'

const initialState = {
  questions: [],
  answers: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Get questions
export const getQuestions = createAsyncThunk('forum/getQuestions', async (_, thunkAPI) => {
    try {
        return await forumService.getQuestions()
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) 
        || error.message 
        || error.toString()
        return thunkAPI.rejectWithValue(message)    
    }
})

// Get answers
export const getAnswers = createAsyncThunk('forum/getAnswers', async (_, thunkAPI) => {
    try {
        return await forumService.getAnswers()
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) 
        || error.message 
        || error.toString()
        return thunkAPI.rejectWithValue(message)    
    }
})

// Create new question
export const createQuestion = createAsyncThunk('forum/createQuestion', async (questionData, thunkAPI) => {
    try {
        return await forumService.createQuestion(questionData)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) 
        || error.message 
        || error.toString()
        return thunkAPI.rejectWithValue(message)    
    }
})

// Create new answer
export const createAnswer = createAsyncThunk('forum/createAnswer', async (answerData, thunkAPI) => {
    try {
        return await forumService.createAnswer(answerData)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) 
        || error.message 
        || error.toString()
        return thunkAPI.rejectWithValue(message)    
    }
})

// Delete question
export const deleteQuestion = createAsyncThunk('forum/deleteQuestion', async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await forumService.deleteQuestion(id, token)
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) 
      || error.message 
      || error.toString()
      return thunkAPI.rejectWithValue(message)   
    }
  }
)

// Delete answer
export const deleteAnswer = createAsyncThunk('forum/deleteAnswer', async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await forumService.deleteAnswer(id, token)
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) 
      || error.message 
      || error.toString()
      return thunkAPI.rejectWithValue(message)   
    }
  }
)

// SLICE
export const forumSlice = createSlice ( {
    name: 'forum',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(getQuestions.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getQuestions.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.questions = action.payload
        })
        .addCase(getQuestions.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(getAnswers.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getAnswers.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.answers = action.payload
        })
        .addCase(getAnswers.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(createQuestion.pending, (state) => {
            state.isLoading = true
        })
        .addCase(createQuestion.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.questions.push(action.payload)
        })
        .addCase(createQuestion.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(createAnswer.pending, (state) => {
            state.isLoading = true
        })
        .addCase(createAnswer.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.answers.push(action.payload)
        })
        .addCase(createAnswer.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(deleteQuestion.pending, (state) => {
            state.isLoading = true
        })
        .addCase(deleteQuestion.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.questions = state.questions.filter(
                (question) => question._id !== action.payload.id )
            })
        .addCase(deleteQuestion.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(deleteAnswer.pending, (state) => {
            state.isLoading = true
        })
        .addCase(deleteAnswer.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.answers = state.answers.filter(
                (answer) => answer._id !== action.payload.id )
            })
        .addCase(deleteAnswer.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
    }
})

export const { reset } = forumSlice.actions
export default forumSlice.reducer