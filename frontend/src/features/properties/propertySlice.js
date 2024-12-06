import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import propertyService from './propertyService'

const initialState = {
  properties: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create new property for a concrete owner
export const createProperty = createAsyncThunk('properties/createProperty', async (propertyData, thunkAPI) => {
    try {
        // thunkAPI has a function getState that can get smth from a different state
        const token = thunkAPI.getState().auth.user.token
        return await propertyService.createProperty(propertyData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) 
        || error.message 
        || error.toString()
        return thunkAPI.rejectWithValue(message)    
    }
})

// Get properties from concrete user
export const getProperties = createAsyncThunk('properties/getProperties', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await propertyService.getProperties(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) 
        || error.message 
        || error.toString()
        return thunkAPI.rejectWithValue(message)    
    }
})

// Get all properties from all users
export const getAllProperties = createAsyncThunk('properties/getAllProperties', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await propertyService.getAllProperties(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) 
        || error.message 
        || error.toString()
        return thunkAPI.rejectWithValue(message)    
    }
})

// Delete property
export const deleteProperty = createAsyncThunk('properties/deleteProperty', async (id, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        return await propertyService.deleteProperty(id, token)
      } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) 
        || error.message 
        || error.toString()
        return thunkAPI.rejectWithValue(message)   
      }
    }
  )

// Update property
export const updateProperty = createAsyncThunk('properties/updateProperty', async (obj, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await propertyService.updateProperty(obj.propertyId, obj.propertyData, token)
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) 
      || error.message 
      || error.toString()
      return thunkAPI.rejectWithValue(message)   
    }
  }
)





export const propertySlice = createSlice ( {
    name: 'properties',
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
        .addCase(createProperty.pending, (state) => {
            state.isLoading = true
        })
        .addCase(createProperty.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.properties.push(action.payload)
        })
        .addCase(createProperty.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(getProperties.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getProperties.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.properties = action.payload
        })
        .addCase(getProperties.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(getAllProperties.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getAllProperties.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.properties = action.payload
        })
        .addCase(getAllProperties.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(deleteProperty.pending, (state) => {
            state.isLoading = true
        })
        .addCase(deleteProperty.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.properties = state.properties.filter(
                (property) => property._id !== action.payload.id )
            })
        .addCase(deleteProperty.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(updateProperty.pending, (state) => {
            state.isLoading = true
        })
        .addCase(updateProperty.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.properties = state.properties.filter(
                (property) => property._id !== action.payload.updatedProperty._id )
                state.properties.push(action.payload.updatedProperty)
            })  
           
        .addCase(updateProperty.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
    }
})

export const { reset } = propertySlice.actions
export default propertySlice.reducer