import axios from 'axios'

// route
const API_URL = '/api/reservations/'

// Get Unapproved Reservations
const getUnapprovedReservations = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL + 'getUnapprovedReservations', config)

    return response.data
}

// Get Approved Reservations
const getApprovedReservations = async (token) => {
  const config = {
      headers: {
          Authorization: `Bearer ${token}`
      }
  }

  const response = await axios.get(API_URL + 'getApprovedReservations', config)

  return response.data
}

// Get clients reservations
const getMyReservations = async (token) => {
  const config = {
      headers: {
          Authorization: `Bearer ${token}`
      }
  }

  const response = await axios.get(API_URL + 'getMyReservations', config)

  return response.data
}

const getAllReservations = async (token) => {
  const config = {
      headers: {
          Authorization: `Bearer ${token}`
      }
  }

  const response = await axios.get(API_URL + 'getAllReservations', config)

  return response.data
}

const getAllReservationsForProperty = async (id, token) => {
  const config = {
      headers: {
          Authorization: `Bearer ${token}`
      }
  }

  const response = await axios.get(API_URL + 'getAllReservationsForProperty/' + id, config)

  return response.data
}

// Set reservation
const setReservation = async (reservationData, token) => {
  const config = {
      headers: {
          Authorization: `Bearer ${token}`
      }
  }

  const response = await axios.post(API_URL +'setReservation', reservationData, config)

  return response.data
}

// Delete Reservation
const deleteReservation = async (id, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.delete(API_URL + 'deleteReservation/' + id, config)
  
    return response.data
}

// Cancel Reservation
const cancelReservation = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + 'cancelReservation/' + id, config)

  return response.data
}

// Update reservation
const approveReservation = async (id, token) => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

    const response = await axios.put(API_URL + 'approveReservation/' + id, 0, config)

    return response.data
}


const reservationService = {
    getUnapprovedReservations,
    getApprovedReservations,
    getMyReservations,
    deleteReservation,
    approveReservation,
    getAllReservations,
    getAllReservationsForProperty,
    setReservation,
    cancelReservation
}
export default reservationService
