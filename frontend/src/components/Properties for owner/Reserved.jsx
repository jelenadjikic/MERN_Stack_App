import React from 'react'
import {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { reset, getApprovedReservations } from  '../../features/reservations/reservationSlice'
import Spinner from '../Spinner'
import { Table, Button } from 'reactstrap';

function Reserved() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
  
    const {user} = useSelector((state) => state.auth)
    const {reservations, isLoding, isError, message} = useSelector((state) => state.reservations)
  
    useEffect(() => {
  
      if(isError){
        console.log(message)
      }

      dispatch(getApprovedReservations())
      
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
        <p>Reserved properties:</p>
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
            </tr>
            </tbody>
            
          ))}
          </Table>
        </>
      ) : 
      (
        <h3> There are no reserved properties! </h3>
      )}
        
   
      </>
  )
}

export default Reserved