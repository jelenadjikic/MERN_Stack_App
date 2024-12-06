import React from 'react'
import {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getOwners, deleteOwner, reset } from '../features/owners/ownerSlice'
import Spinner from '../components/Spinner'
import { Table } from 'reactstrap';
import { Button } from 'reactstrap';
function Owners() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
  
    const {user} = useSelector((state) => state.auth)
    const {owners, isLoding, isError, message} = useSelector((state) => state.owners)
  
    useEffect(() => {
  
      if(isError){
        console.log(message)
      }
  
      if(!user){
        navigate('/login')
      }
  
      dispatch(getOwners())
      
      return () => {
        dispatch(reset())
      }
    }, [user, navigate, isError, message, dispatch])
  
    if(isLoding){
      return <Spinner />
    }
  
    return (
      <>
      <section className="heading">
        <p>All owners</p>
      </section>
      
      { owners.length > 0 ? 
      (
        <>
          <Table striped>
          <thead>
            <tr>
              <th>
                First Name
              </th>
              <th>
                Email
              </th>
              <th>
                
              </th>
            </tr>
          </thead>
          {owners.map((owner) => (
            <tbody>
            <tr>
              <th>
               {owner.name}
              </th>
              <th>
                {owner.email}
              </th>
              <th>
              <Button color="danger" onClick={() => dispatch(deleteOwner(owner._id))}>
                Delete owner
              </Button>
              </th>
            </tr>
            </tbody>
            
          ))}
          </Table>
        </>
      ) : 
      (
        <h3> There are no owners! </h3>
      )}
        
   
      </>
    )
  }
  
  export default Owners
  