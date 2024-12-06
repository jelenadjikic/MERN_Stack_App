import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Col, Input } from 'reactstrap';
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import Spinner from "../Spinner"
import { updateProperty, reset } from "../../features/properties/propertySlice"

// property is the property that is changing
function UpdateProperty({ property }) {

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const [formData, setFormData] = useState({
        name: property.name,
        location: property.location,
        description: property.description,
        price: property.price,
        photo: property.photo
      })

    const { name, location, description, price, photo} = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user} = useSelector((state) => state.auth)
    const {properties, isSuccess, isLoding, isError, message} = useSelector((state) => state.properties)

    useEffect(() => {

        if(isError){
            console.log(message)
        }

        if(isSuccess)
            console.log("Success")

        return () => {
            dispatch(reset())
        }
        }, [user, navigate, isError, message, dispatch])

        const onChange = (e) => {
            setFormData((prevState) => ({
              ...prevState,
              [e.target.name]: e.target.value,
            }))
        }
    
        const onSubmit = (e) => {
            e.preventDefault()
            const propertyData = {
                name,
                location,
                description,
                price,
                photo
            }
            console.log(propertyData)
            console.log(property._id)

            dispatch(updateProperty({propertyId: property._id, propertyData: propertyData}))

            setModal(false)
              
          }

        if(isLoding){
            return <Spinner />
        }

  return (
    <div>

      <Button color="warning"  size="sm" onClick={toggle}>
        Edit property
      </Button>

      <Modal isOpen={modal} fade={false} toggle={toggle}>
        <ModalHeader toggle={toggle}>Edit property</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
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
                            id="location"
                            name="location"
                            placeholder="Enter location"
                            type="text"
                            onChange={onChange}
                            value={location}
                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col sm={10}>
                        <Input
                            id="description"
                            name="description"
                            placeholder="Enter description"
                            type="textarea"
                            onChange={onChange}
                            value={description}
                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col sm={10}>
                        <Input
                            id="price"
                            name="price"
                            placeholder="Enter price"
                            type="text"
                            onChange={onChange}
                            value={price}
                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="photo" sm={2} >
                        Add photo
                    </Label>
                    <Col sm={10}>
                        <Input
                            id="photo"
                            name="photo"
                            type="text"
                            onChange={onChange}
                            value={photo}
                        />
                    </Col>
                </FormGroup>
          </Form>

        </ModalBody>

        <ModalFooter>
          <Button type='submit' color="primary" onClick={onSubmit} >
            Edit
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default UpdateProperty