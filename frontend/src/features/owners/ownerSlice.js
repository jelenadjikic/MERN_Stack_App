import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import ownerService from './ownerService'

const initialState = {
    owners: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
  }
  
  // Get owners
  export const getOwners = createAsyncThunk('owners/getOwners', async (_, thunkAPI) => {
      try {
          // thunkAPI has a function getState that can get smth from a different state
          const token = thunkAPI.getState().auth.user.token
          return await ownerService.getOwners(token)
      } catch (error) {
          const message = (error.response && error.response.data && error.response.data.message) 
          || error.message 
          || error.toString()
          return thunkAPI.rejectWithValue(message)    
      }
  })
  
  // Delete owner
  export const deleteOwner = createAsyncThunk('owners/deleteOwner', async (id, thunkAPI) => {
        try {
          const token = thunkAPI.getState().auth.user.token
          return await ownerService.deleteOwner(id, token)
        } catch (error) {
          const message = (error.response && error.response.data && error.response.data.message) 
          || error.message 
          || error.toString()
          return thunkAPI.rejectWithValue(message)   
        }
      }
    )
  
  export const ownerSlice = createSlice ( {
      name: 'owners',
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
          .addCase(getOwners.pending, (state) => {
              state.isLoading = true
          })
          .addCase(getOwners.fulfilled, (state, action) => {
              state.isLoading = false
              state.isSuccess = true
              state.owners = action.payload
          })
          .addCase(getOwners.rejected, (state, action) => {
              state.isLoading = false
              state.isError = true
              state.message = action.payload
          })
          .addCase(deleteOwner.pending, (state) => {
              state.isLoading = true
          })
          .addCase(deleteOwner.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.owners = state.owners.filter(
              (owner) => owner._id !== action.payload.id )
          })
          .addCase(deleteOwner.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
          })
      }
  })
  
  export const { reset } = ownerSlice.actions
  export default ownerSlice.reducer