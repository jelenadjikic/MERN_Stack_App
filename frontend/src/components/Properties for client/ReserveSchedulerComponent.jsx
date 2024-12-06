import React from 'react'
import {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllReservationsForProperty, reset, setReservation } from  '../../features/reservations/reservationSlice'
import Spinner from '../Spinner'
import { toast } from 'react-toastify'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

function ReserveSchedulerComponent({property, d, t}) {

    let exsists=false
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    
    const dispatch = useDispatch()
    const {reservations, isLoding, isError, message} = useSelector((state) => state.reservations)
  
    
    useEffect(() => {

        if (isError) {
            toast.error(message)
        }
        
    
        dispatch(getAllReservationsForProperty(property._id))
        return () => {
            dispatch(reset())
        }
        
    }, [isError, message, dispatch])

    
    if(reservations.length > 0){
        reservations.forEach(r => {
            if( r.date == d && r.time == t)
                exsists=true
        })
}

    const onSubmit = (e) => {

        e.preventDefault(); 
        const reservationData = {
            date: d,
            time: t,
            propertyId: property._id,
            ownerId: property.user
        }
        dispatch(setReservation(reservationData))
        toggle()
      }

      if(isLoding){
        return <Spinner />
      }



  return (
    <div className='reserveSchedulerComponent'>
        {!exsists ? (
            <Button color="success" className="reserveBtn" onClick={toggle}>
                Reserve
            </Button>
             ): (
            <Button color="danger" className="reserveBtn" disabled>
                Taken
            </Button>
            )}
       

        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}> 
                Reservation confirtmation
            </ModalHeader>
            <ModalBody>
                Are you sure you want to reserve this date and time?
            </ModalBody>
            <ModalFooter>
                <Button color="success" onClick={onSubmit}>
                    Reserve
                </Button>
                <Button color="danger" onClick={toggle}>
                    Cancel
                </Button>
            </ModalFooter>
      </Modal>
    </div>
  )
}

export default ReserveSchedulerComponent