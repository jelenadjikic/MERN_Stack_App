import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import Spinner from "../Spinner"
import { getAllProperties, reset } from "../../features/properties/propertySlice"
import PropertyCardForClient from "./PropertyCardForClient"
import { Button, Input } from "reactstrap"
import { FaSearch } from 'react-icons/fa'

function AllProperties() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user} = useSelector((state) => state.auth)
  const {properties, isLoding, isError, message} = useSelector((state) => state.properties)

  const [searchByName, setSearchByName] = useState("")
  const [foundProperties, setFoundProperties] = useState([])


  useEffect(() => {

    if(isError){
      console.log(message)
    }

    if(!user){
      navigate('/login')
    }

    dispatch(getAllProperties())
    
    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

 
  const onSubmit = (e) => {
    e.preventDefault()

    let niz=[]
    properties.forEach( property => {
      if(property.name.startsWith(searchByName))
        niz.push(property)
    })

    setFoundProperties(niz)
    
  }
   
  
  if(isLoding){
    return <Spinner />
  }

  return (
    <>
    <section className="heading">
      <p>Available properties</p>
    </section>

    <div style={{display:'flex', flexDirection:'row'}}>
      <Input
          id="searchByName"
          name="searchByName"
          placeholder="Search by name"
          type="text"
          onChange={(e) => setSearchByName(e.target.value)}
      />
      <Button onClick={onSubmit}>
        <FaSearch/>
      </Button>
    </div>

    <div>
          <div className='propertiesForClient'>
            {foundProperties.length>0 ?  
              (
                foundProperties.map((property) => (
                  <PropertyCardForClient key={property._id} property={property} /> ))
              ): 
              (
                properties.map((property) => (
                  <PropertyCardForClient key={property._id} property={property} /> ))
            )
            }
          </div>
        
      </div>
    </>
  )
}

export default AllProperties
