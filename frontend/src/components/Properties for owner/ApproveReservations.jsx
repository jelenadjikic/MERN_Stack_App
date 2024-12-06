import React from 'react'
import { useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { reset, getUnapprovedReservations, deleteReservation, approveReservation } from  '../../features/reservations/reservationSlice'
import Spinner from '../Spinner'
import { Table, Button } from 'reactstrap';
import { toast } from 'react-toastify'

function ApproveReservations() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
  
    const {reservations, isLoding, isError, message} = useSelector((state) => state.reservations)
  
    useEffect(() => {
  
      if(isError){
        toast.error(message)
      }

      dispatch(getUnapprovedReservations())
      
      return () => {
        dispatch(reset())
      }
    }, [navigate, isError, message, dispatch])
  
    if(isLoding){
      return <Spinner />
    }

  return (
    <>
      <section className="heading">
        <p>Requests:</p>
      </section>
      
      { reservations.length > 0 ? 
      (
        <>
          <Table striped>
          <thead>
            <tr>
              <th>
                Client name
              </th>
              <th>
                Property name
              </th>
              <th>
                Date
              </th>
              <th>
                Time
              </th>
              <th>
                
              </th>
              <th>
                
              </th>
            </tr>
          </thead>
          {reservations.map((reservation) => (
            <tbody>
            <tr>
              <th>
               {reservation.client.name}
              </th>
              <th>
                {reservation.property.name}
              </th>
              <th>
                {reservation.date}
              </th>
              <th>
                {reservation.time}
              </th>
              <th>
              <Button color="success" onClick={() => dispatch(approveReservation(reservation._id))}>
                Approve
              </Button>
              </th>
              <th>
              <Button color="danger" onClick={() => dispatch(deleteReservation(reservation._id))}>
                Decline
              </Button>
              </th>
            </tr>
            </tbody>
            
          ))}
          </Table>
        </>
      ) : 
      (
        <h3> There are no requests! </h3>
      )}
        
   
      </>
  )
}

export default ApproveReservations