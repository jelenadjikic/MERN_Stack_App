import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { reset, getMyReservations, cancelReservation } from  '../../features/reservations/reservationSlice'
import Spinner from '../Spinner'
import { Table, Button } from 'reactstrap';
import { toast } from 'react-toastify'

function MyReservations() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
  
    const {reservations, isLoding, isError, message} = useSelector((state) => state.reservations)
  
    useEffect(() => {
  
      if(isError){
        toast.error(message)
      }

      dispatch(getMyReservations())
      
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
        <p>My resrvations:</p>
      </section>
      
      { reservations.length > 0 ? 
      (
        <>
          <Table striped>
          <thead>
            <tr>
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
                Approved
              </th>
              <th>
                Cancel your reservation
              </th>
            </tr>
          </thead>
          {reservations.map((reservation) => (
            <tbody>
            <tr>
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
                {reservation.approved ? ("Approved") : ("Not approved")}
              </th>
              <th>
                {!reservation.approved ? 
                  (
                  <Button color="danger" onClick={() => dispatch(cancelReservation(reservation._id))}>
                    Cancel reservation
                  </Button>) 
                  : ("")}
              </th>
            </tr>
            </tbody> 
          ))}
          </Table>
        </>
      ) : 
      (
        <>
        <h3> You have not made any reservations! Go to Available properties and make some! </h3>
        <Button color="info" onClick = {() => {navigate("/allProperties")}}>Make your first reservation</Button>
        </>
      )}
        
   
      </>
  )
}

export default MyReservations