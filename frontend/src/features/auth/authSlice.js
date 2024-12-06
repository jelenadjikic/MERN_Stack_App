import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))

// Initial state
const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

// Register user
// First param - user passed from Register.jsx page/component
// Second param - thunkAPI
export const register = createAsyncThunk('auth/register', 
    async (user, thunkAPI) => {
    try {
        // Calls a register function from authService - register which return user data from response
        return await authService.register(user)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) 
                        || error.message 
                        || error.toString()
        return thunkAPI.rejectWithValue(message)               
    }
})

// Register owner
// First param - user passed from Register.jsx page/component
// Second param - thunkAPI
export const registerOwner = createAsyncThunk('auth/registerOwner', 
    async (userData, thunkAPI) => {
    try {
        // Calls a register function from authService - register which return user data from response
        const token = user.token
        console.log(" TOKEN: " , token)
        return await authService.registerOwner(userData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) 
                        || error.message 
                        || error.toString()
        return thunkAPI.rejectWithValue(message)               
    }
})

// Login user
export const login = createAsyncThunk('auth/login', 
    async (user, thunkAPI) => {
    try {
        return await authService.login(user)
    } catch (error) {
    const message =
        (error.response && error.response.data && error.response.data.message) 
        || error.message 
        || error.toString()
    return thunkAPI.rejectWithValue(message)
    }
  })

  // Logout user
export const logout = createAsyncThunk('auth/logout', 
    async () => {
        await authService.logout()
    })

 // Update user
export const updateUser = createAsyncThunk('auth/updateUser', async (userData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await authService.updateUser(userData, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) 
    || error.message 
    || error.toString()
    return thunkAPI.rejectWithValue(message)   
  }
}
)   

// Change password
export const changePassword = createAsyncThunk('auth/changePassword', async (userData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await authService.changePassword(userData, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) 
    || error.message 
    || error.toString()
    return thunkAPI.rejectWithValue(message)   
  }
}
)  

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // For reseting the state to initial values
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        },
    },
    extraReducers: (builder) => {
        builder
          .addCase(register.pending, (state) => {
            state.isLoading = true
          })
          .addCase(register.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
          })
          .addCase(register.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
          })
          .addCase(registerOwner.pending, (state) => {
            state.isLoading = true
          })
          .addCase(registerOwner.fulfilled, (state) => {
            state.isLoading = false
            state.isSuccess = true
          })
          .addCase(registerOwner.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
          })
          .addCase(login.pending, (state) => {
            state.isLoading = true
          })
          .addCase(login.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
          })
          .addCase(login.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
          })
          .addCase(logout.fulfilled, (state) => {
            state.user = null
          })
          .addCase(updateUser.pending, (state) => {
            state.isLoading = true
          })
          .addCase(updateUser.fulfilled, (state, action) => {
              state.isLoading = false
              state.isSuccess = true
              state.user.name = action.payload.name
              state.user.email = action.payload.email
              state.message = "Your information has been successfully changed!"
          })
          .addCase(updateUser.rejected, (state, action) => {
              state.isLoading = false
              state.isError = true
              state.message = action.payload
          })
          .addCase(changePassword.pending, (state) => {
            state.isLoading = true
          })
          .addCase(changePassword.fulfilled, (state, action) => {
              state.isLoading = false
              state.isSuccess = true
              state.message = "Your password has been succesfully changed!"
          })
          .addCase(changePassword.rejected, (state, action) => {
              state.isLoading = false
              state.isError = true
              state.message = action.payload
          })
    },
})

export const { reset } = authSlice.actions
export default authSlice.reducer