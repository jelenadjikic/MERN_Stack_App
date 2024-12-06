import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import Spinner from "../Spinner"
import { getProperties, reset } from "../../features/properties/propertySlice"
import PropertyCard from "./PropertyCard"
import AddNewProperty from "./AddNewProperty"

function OwnerProperties() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user} = useSelector((state) => state.auth)
  const {properties, isLoding, isError, message} = useSelector((state) => state.properties)

  useEffect(() => {

    if(isError){
      console.log(message)
    }

    if(!user){
      navigate('/login')
    }

    dispatch(getProperties())
    
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
      <p>My properties</p>
      <AddNewProperty/>
    </section>

    <section className='content'>
        {properties.length > 0 ? (
          <div>
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} /> 
            ))}
          </div>
        ) : (
          <h3>You have no properties</h3>
        )}
      </section>
    </>
  )
}

export default OwnerProperties
