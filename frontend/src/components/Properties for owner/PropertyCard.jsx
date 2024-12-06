import { useDispatch } from 'react-redux'
import { deleteProperty } from '../../features/properties/propertySlice'
import { Card, CardBody, CardTitle, CardSubtitle, CardText, Button} from 'reactstrap'
import UpdateProperty from './UpdateProperty'

function PropertyCard({ property }) {
    
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

            <UpdateProperty key={property._id} property={property}/>
            <Button  color="danger" size="sm" onClick={() => dispatch(deleteProperty(property._id))} >
                Delete property
            </Button>

        </CardBody>
    </Card>

    </div>
  )
}

export default PropertyCard
