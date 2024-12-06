import React from 'react'
import { Card, CardBody, CardTitle, CardHeader, CardText, Button} from 'reactstrap'
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import Spinner from "../Spinner"
import { getAnswers, deleteQuestion, reset, deleteAnswer } from "../../features/forum/forumSlice"
import AnswerCard from "./AnswerCard"
import AddAnswer from './AddAnswer'
import { toast } from 'react-toastify'

function QuestionCard({ question }) {

    const navigate = useNavigate()
    const dispatch = useDispatch()
  
    const {user} = useSelector((state) => state.auth)
    const {answers, isLoding, isError, message} = useSelector((state) => state.forum)
  
    useEffect(() => {
  
      if(isError){
        toast.error(message)
      }
  
      dispatch(getAnswers())
      
      return () => {
        dispatch(reset())
      }
    }, [navigate, isError, message, dispatch])
  
    let neededAnswers = []
    answers.map(answer => {
      if(answer.question === question._id)
          neededAnswers.push(answer)
    })

    const deleteQuestionAndAnswers= () => {
        dispatch(deleteQuestion(question._id))
        neededAnswers.map(answer => {
        dispatch(deleteAnswer(answer._id))
      })
    }

    if(isLoding){
      return <Spinner />
    }

  return (
    <div >
        <Card
            className="questionCard"
            inverse
            style={{
             width:"100%"
            }}
        >
            <CardHeader>
               {new Date(question.createdAt).toLocaleString('en-US') + "     " + question.nickname}
            </CardHeader>
            <CardBody>
                <CardTitle tag="h5">
                    {question.title}
                </CardTitle>
                <CardText>
                    {question.text}
                </CardText>
                <AddAnswer key={question._id} question={question} />
                {user && user.role === 'admin' &&
                  <Button className= 'btnDeleteQuestion' size="sm" onClick={() => deleteQuestionAndAnswers()} >
                    Delete question 
                  </Button>
                } 
            </CardBody>
        </Card>

        <div className='answersList'>
              {(answers.length )> 0 ? (
                <div>
                    {neededAnswers.map((answer) => (
                        <AnswerCard key={answer._id} answer={answer} /> 
                    ))}
                </div>
                ) : (
                <h3></h3>
                )} 
            </div>
       
    </div>
  )
}

export default QuestionCard