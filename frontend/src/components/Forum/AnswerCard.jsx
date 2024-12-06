import { Button, Card, CardBody, CardTitle, CardHeader, CardText} from 'reactstrap'
import { useSelector, useDispatch } from "react-redux"
import { deleteAnswer } from "../../features/forum/forumSlice"

function AnswerCard({ answer }) {

  const {user} = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  return (
    <>
        <Card
            className="answerCard"
            inverse
            style={{
             width:"100%"
            }} 
        >
            <CardHeader>
               {new Date(answer.createdAt).toLocaleString('en-US') + "    " + answer.nickname}
            </CardHeader>
            <CardBody>
                <CardTitle tag="h5">
                    {answer.title}
                </CardTitle>
                <CardText>
                    {answer.text}
                </CardText>
                {user && user.role === 'admin' &&
                  <Button className='btnDeleteAnswer' size="sm" onClick={() => dispatch(deleteAnswer(answer._id))}>
                    Delete answer
                  </Button>
                }  
            </CardBody>
        </Card>
    </>
  )
}

export default AnswerCard