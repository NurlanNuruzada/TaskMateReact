import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';




export default function CustomModal({ show, title, object, message, type, updateParentState }) {
  const [showModal, setModalShow] = useState(show);

  const handleClick = () => {
    updateParentState(!show);
  };

  useEffect(() => {
    setModalShow(show);
  }, [show]);
  
  return (
    <>
      <Modal
        show={showModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        className='create-share-link-modal'
        centered
      >
        <Modal.Body className='p-0 position-relative' id="contained-modal-title-vcenter">
          <Row className='p-0 d-flex flex-nowrap'>
            <div className='py-4 px-5'>
              <Modal.Header>
                <Modal.Title className='fw-bold mb-4 d-flex justify-content-between align-items-center' id="contained-modal-title-vcenter">
                  <span>{title}</span>
                </Modal.Title>
                <Button className='create-workspace-close btn-close' onClick={handleClick}></Button>
              </Modal.Header>
              <Modal.Body>
                <h4>Do you want to {type} this {object}</h4>
                <p>
                  {message}
                </p>
              </Modal.Body>
              <Modal.Footer>
                <Button className='btn btn-danger'>Yes</Button>
                <Button className='btn btn-dark' onClick={handleClick}>No</Button>
              </Modal.Footer>
            </div>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
}