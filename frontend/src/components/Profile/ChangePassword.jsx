import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Col, Input } from 'reactstrap';
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import Spinner from "../Spinner"
import {  reset, changePassword } from "../../features/auth/authSlice"
import { toast } from 'react-toastify'

function ChangePassword() {
    
    const {user, isError, isLoding, isSuccess, message} = useSelector((state) => state.auth)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const [formData, setFormData] = useState({
        oldPassword: user.oldPassword,
        newPassword: user.newPassword,
        confirmPassword:user.confirmPassword
      })

    const { oldPassword, newPassword, confirmPassword} = formData

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
            if(newPassword!==confirmPassword)
            {
                console.log("Password do not match")
            }
            else{
                const userData = {
                    id: user._id,
                    oldPassword,
                    newPassword
                }
            dispatch(changePassword(userData)) 
            }
          }

        if(isLoding){
            return <Spinner />
        }


    return (
        <>
        <section className="heading">
            <p>Change your password</p>
        </section>
        <div class="col-sm-4 mx-auto ">
        <div class="team-item">
            <img src="https://static-00.iconduck.com/assets.00/profile-circle-icon-2048x2048-cqe5466q.png" class="team-img" alt="pic" />                   
            <h3>{user.name}</h3>             
            <div class="team-info"><p>{user.role}</p></div>

            <>
            <Form onSubmit={onSubmit}>
                <FormGroup row>
                    <Col sm={10}>
                        <Input
                            id="oldPassword"
                            name="oldPassword"
                            placeholder="Enter old password"
                            type="text"
                            onChange={onChange}
                            value={oldPassword}
                        />
                    </Col>
                </FormGroup>

                <FormGroup row>
                    <Col sm={10}>
                        <Input
                            id="newPassword"
                            name="newPassword"
                            placeholder="Enter new password"
                            type="text"
                            onChange={onChange}
                            value={newPassword}
                        />
                    </Col>
                </FormGroup>

                <FormGroup row>
                    <Col sm={10}>
                        <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Confirm new password"
                            type="text"
                            onChange={onChange}
                            value={confirmPassword}
                        />
                    </Col>
                </FormGroup>

                <Button type='submit' color="primary" onClick={onSubmit} >
                    Change password
                </Button>
                
          </Form></> 
        </div>
        </div> 
        </>
    )
}
  export default ChangePassword