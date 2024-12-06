import QuestionCard from './QuestionCard'
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import Spinner from "../Spinner"
import { getQuestions, reset } from "../../features/forum/forumSlice"
import AddQuestion from './AddQuestion'
import { toast } from 'react-toastify'

function Forum() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {questions, isLoding, isError, message} = useSelector((state) => state.forum)
  
    useEffect(() => {
  
      if(isError){
        toast.error(message)
      }
  
      dispatch(getQuestions())

      return () => {
        dispatch(reset())
      }
    }, [navigate, isError, message, dispatch])
  
    if(isLoding){
      return <Spinner />
    }

  return ( 
    <>
        <section className="heading">
            <p>Forum</p>
            <AddQuestion/>
        </section>
        <section className='content'>
            {questions.length > 0 ? (
            <div>
                {questions.map((question) => (
                    <QuestionCard key={question._id} question={question} /> 
                ))}
            </div>
            ) : (
            <h3>There are no questions</h3>
            )}
        </section>
    </>
  )
}

export default Forum