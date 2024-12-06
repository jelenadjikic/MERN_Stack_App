import { useDispatch } from 'react-redux'
import { Card, CardBody, CardTitle, CardSubtitle, CardText, ListGroup, ListGroupItem, Button} from 'reactstrap'
import ReserveProperty from './ReserveProperty'

function PropertyCardForClient({ property }) {
    
  const dispatch = useDispatch()

  return (
    <div>
        <Card style={{ width: '18rem'}}>
        <img alt="Sample" src="https://picsum.photos/300/200"/>
        <CardBody>
            <CardTitle tag="h5">
                {property.name}
            </CardTitle>
            <CardSubtitle className="mb-2 text-muted" tag="h6">
                {property.location}
            </CardSubtitle>
            <CardText>
                {property.description}
            </CardText>
            <ListGroup flush>
                <ListGroupItem>
                    {"Price for one tour  " + property.price + "$"}
                </ListGroupItem>
            </ListGroup>
            
            <ReserveProperty key={property._id} property={property}/>
        </CardBody>
    </Card>

    </div>
  )
}

export default PropertyCardForClient
