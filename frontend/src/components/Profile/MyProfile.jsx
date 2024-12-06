import React, { useState } from 'react';
import {Form, FormGroup, Input, Col, Button} from 'reactstrap';
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import Spinner from "../Spinner"
import { reset, updateUser } from "../../features/auth/authSlice"
import { toast } from 'react-toastify'

function MyProfile() {
    
    const {user, isError, isLoding, isSuccess, message} = useSelector((state) => state.auth)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const [formData, setFormData] = useState({
        name: user.name,
        email: user.email,
      })

    const { name, email} = formData

    useEffect(() => {

        if(isError)
         toast.error(message)

        if(isSuccess)
            toast.success(message)

        return () => {
            dispatch(reset())
        }
        }, [navigate, isError,  dispatch])

        const onChange = (e) => {
            setFormData((prevState) => ({
              ...prevState,
              [e.target.name]: e.target.value,
            }))
        }
    
        const onSubmit = (e) => {
            e.preventDefault()
            const userData = {
                id: user._id,
                name,
                email
            }

            dispatch(updateUser(userData)) 
          }

        if(isLoding){
            return <Spinner />
        }


    return (
    <>
        <section className="heading">
        <p>My profile</p>
        </section>
        <div class="col-sm-4 mx-auto ">
        <div class="team-item">
            <img src="https://static-00.iconduck.com/assets.00/profile-circle-icon-2048x2048-cqe5466q.png" class="team-img" alt="pic" />                   
            <h3>{user.name}</h3>             
            <div class="team-info"><p>{user.role}</p></div>
            <><Form onSubmit={onSubmit}>
                <FormGroup row>
                    <Col sm={10}>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            onChange={onChange}
                            value={name}
                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col sm={10}>
                        <Input
                            id="email"
                            name="email"
                            placeholder="Enter email"
                            type="text"
                            onChange={onChange}
                            value={email}
                        />
                    </Col>
                </FormGroup>
                <Button type='submit' color="primary" onClick={onSubmit} >
                    Update
                </Button>
          </Form></> 
        </div>
        </div> 
        </>
    )
}
     

export default MyProfile