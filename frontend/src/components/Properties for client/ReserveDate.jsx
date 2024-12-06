import React from 'react'
import {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Form, FormGroup, Label, Input, Button} from 'reactstrap'
import { reset, setReservation } from  '../../features/reservations/reservationSlice'
import Spinner from '../Spinner'
import { toast } from 'react-toastify'


function ReserveDate({property}) {

  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const dispatch = useDispatch()

  const {isLoding, isError, isSuccess, message} = useSelector((state) => state.reservations)


  useEffect(() => {

      if (isError) {
        toast.error(message)
      }
      
      if(isSuccess){
        toast.success(message)
      }
      
      return () => {
        dispatch(reset())
      }
    }, [isError, message, dispatch])

  
    const onSubmit = (e) => {
        e.preventDefault()
        const reservationData = {
            date,
            time,
            propertyId: property._id,
            ownerId: property.user
        }
        dispatch(setReservation(reservationData))
      }

    if(isLoding){
      return <Spinner />
    }

  return (
    <div>

    <Form >
     <FormGroup>
       <Label>Date</Label>
       <Input
         className="border-info"
         type="date"
         onChange={(e) => setDate(e.target.value)}
         value={date}
       />
     </FormGroup>

     <FormGroup>
       <Label>Time </Label>
       <Input
         className="border-info"
         type="select"
         onChange={(e) => setTime(e.target.value)}
         value={time}
       >
         <option></option>
         <option value="10">10:00</option>
         <option value="13">13:00</option>
         <option value="15">15:00</option>
         <option value="17">17:00</option>
         <option value="19">19:00</option>
       </Input>
     </FormGroup>

     <Button className="mt-4" color="success" outline type="submit" onClick={onSubmit}>
       Make appointment
     </Button>
     <Button className="mt-4" color="danger"  outline>
       Cancel
     </Button>
   </Form>

 </div>
  )
}

export default ReserveDate