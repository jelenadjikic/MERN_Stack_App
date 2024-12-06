import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ReserveDate from './ReserveDate';
import ReserveScheduler from './ReserveScheduler';

function ReserveProperty({ property }) {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="danger" onClick={toggle}>
        Reserve property
      </Button>
      <Modal isOpen={modal} toggle={toggle} fullscreen>
        <ModalHeader toggle={toggle}>Reserve property - {property.name} </ModalHeader>
        <ModalBody>
          
          <ReserveScheduler key={property._id} property={property}/>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default ReserveProperty;