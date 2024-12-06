import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import reservationService from './reservationService'

const initialState = {
  reservations: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Get unapproved reservations
export const getUnapprovedReservations = createAsyncThunk('reservations/getUnapprovedReservations', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await reservationService.getUnapprovedReservations(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) 
        || error.message 
        || error.toString()
        return thunkAPI.rejectWithValue(message)    
    }
})

// Get approved reservations
export const getApprovedReservations = createAsyncThunk('reservations/getApprovedReservations', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await reservationService.getApprovedReservations(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) 
        || error.message 
        || error.toString()
        return thunkAPI.rejectWithValue(message)    
    }
})

// Get all reservations
export const getAllReservations = createAsyncThunk('reservations/getAllReservations', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await reservationService.getAllReservations(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) 
        || error.message 
        || error.toString()
        return thunkAPI.rejectWithValue(message)    
    }
})

// Get all reservations for property
export const getAllReservationsForProperty = createAsyncThunk('reservations/getAllReservationsForProperty', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await reservationService.getAllReservationsForProperty(id,token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) 
        || error.message 
        || error.toString()
        return thunkAPI.rejectWithValue(message)    
    }
})

// Get my reservations
export const getMyReservations = createAsyncThunk('reservations/getMyReservations', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await reservationService.getMyReservations(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) 
        || error.message 
        || error.toString()
        return thunkAPI.rejectWithValue(message)    
    }
})

// Set reservation
export const setReservation = createAsyncThunk('reservations/setReservation', async (reservationData, thunkAPI) => {
    try {
        // thunkAPI has a function getState that can get smth from a different state
        const token = thunkAPI.getState().auth.user.token
        return await reservationService.setReservation(reservationData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) 
        || error.message 
        || error.toString()
        return thunkAPI.rejectWithValue(message)    
    }
})

// Delete reservation
export const deleteReservation = createAsyncThunk('reservations/deleteReservation', async (id, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        return await reservationService.deleteReservation(id, token)
      } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) 
        || error.message 
        || error.toString()
        return thunkAPI.rejectWithValue(message)   
      }
    }
  )

// Cancel reservation
export const cancelReservation = createAsyncThunk('reservations/cancelReservation', async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await reservationService.cancelReservation(id, token)
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) 
      || error.message 
      || error.toString()
      return thunkAPI.rejectWithValue(message)   
    }
  }
)

// Update property
export const approveReservation = createAsyncThunk('reservations/approveReservation', async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await reservationService.approveReservation(id, token)
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) 
      || error.message 
      || error.toString()
      return thunkAPI.rejectWithValue(message)   
    }
  }
)

export const reservationSlice = createSlice ( {
    name: 'reservations',
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
        .addCase(getUnapprovedReservations.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getUnapprovedReservations.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.reservations = action.payload
        })
        .addCase(getUnapprovedReservations.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(getApprovedReservations.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getApprovedReservations.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.reservations = action.payload
        })
        .addCase(getApprovedReservations.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(getMyReservations.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getMyReservations.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.reservations = action.payload
        })
        .addCase(getMyReservations.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(deleteReservation.pending, (state) => {
            state.isLoading = true
        })
        .addCase(deleteReservation.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.reservations = state.reservations.filter(
                (reservation) => reservation._id !== action.payload.id )
            state.message = "Reservation deleted succesfully"
            })
        .addCase(deleteReservation.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(cancelReservation.pending, (state) => {
            state.isLoading = true
        })
        .addCase(cancelReservation.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.reservations = state.reservations.filter(
                (reservation) => reservation._id !== action.payload.id )
            state.message = "Reservation canceled succesfully"
            })
        .addCase(cancelReservation.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(approveReservation.pending, (state) => {
            state.isLoading = true
        })
        .addCase(approveReservation.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.reservations = state.reservations.filter(
                (reservation) => reservation._id !== action.payload.id )
            state.message = "Reservation approved succesfully"
        })  
        .addCase(approveReservation.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(getAllReservations.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getAllReservations.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.reservations = action.payload
        })
        .addCase(getAllReservations.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(setReservation.pending, (state) => {
            state.isLoading = true
        })
        .addCase(setReservation.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.reservations.push(action.payload)
            state.message = "Reservation has been sent to owner succesfully"
        })
        .addCase(setReservation.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(getAllReservationsForProperty.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getAllReservationsForProperty.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.reservations = action.payload
        })
        .addCase(getAllReservationsForProperty.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
    }
})

export const { reset } = reservationSlice.actions
export default reservationSlice.reducer