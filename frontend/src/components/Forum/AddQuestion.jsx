import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Col, Input } from 'reactstrap';
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import Spinner from "../Spinner"
import { createQuestion, reset } from "../../features/forum/forumSlice"
import { toast } from 'react-toastify'

function AddQuestion() {

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    
    const {user} = useSelector((state) => state.auth)

    const [formData, setFormData] = useState({
        nickname: '',
        title: '',
        text: ''
      })

    const { nickname, title, text } = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {isLoding, isError, message} = useSelector((state) => state.forum)

    useEffect(() => {

        if(isError){
            toast.error(message)
        }

        return () => {
            dispatch(reset())
        }
        }, [navigate, isError, message, dispatch])

       

        const onChange = (e) => {
            setFormData((prevState) => ({
              ...prevState,
              [e.target.name]: e.target.value,
            }))
        }
    
        const onSubmit = (e) => {
            e.preventDefault()

            let questionData
            
            if(!user)
            {
                questionData = {
                    nickname,
                    title,
                    text,
                }
            }
            else {
                questionData = {
                    nickname: user.name,
                    title,
                    text,
                }
            }

            dispatch(createQuestion(questionData))

            setFormData(() => ({
                nickname: '',
                title: '',
                text: ''
            }))
            
           setModal(false)
              
          }


        if(isLoding){
            return <Spinner />
        }

  return (
    <div>
      <Button className= 'btnAddQuestion' onClick={toggle}>
        Ask question
      </Button>
      <Modal isOpen={modal} fade={false} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add your question</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
                <FormGroup row>
                    <Col sm={10}>
                        {!user &&
                        (
                            <Input
                                id="nickname"
                                name="nickname"
                                placeholder="Enter nickname"
                                type="text"
                                onChange={onChange}
                                value={nickname}
                            />
                        )
                    }
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col sm={10}>
                        <Input
                            id="title"
                            name="title"
                            placeholder="Enter title"
                            type="text"
                            onChange={onChange}
                            value={title}
                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col sm={10}>
                        <Input
                            id="text"
                            name="text"
                            placeholder="Enter text"
                            type="textarea"
                            onChange={onChange}
                            value={text}
                        />
                    </Col>
                </FormGroup>
          </Form>
        </ModalBody>

        <ModalFooter>
          <Button type='submit' color="primary" onClick={onSubmit} >
            Add
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default AddQuestion;