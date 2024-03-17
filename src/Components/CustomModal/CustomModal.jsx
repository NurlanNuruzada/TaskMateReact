import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Styles from './CostomModal.module.css'



export default function CustomModal({ show, title, object, message, type, updateParentState }) {
  const [showModal, setModalShow] = useState(show);

  const handleClick = () => {
    updateParentState(!show,false);
  };
  const handleClick2 = () => {
    updateParentState(!show,true);
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
        onHide={handleClick}
      >
        <Modal.Body className='p-0 position-relative' id="contained-modal-title-vcenter">
          <Row className='p-0 d-flex flex-nowrap'>
            <div className='py-4 px-5'>
              <Modal.Header className='mb-3'>
                <Modal.Title className='fw-bold d-flex justify-content-between align-items-center' id="contained-modal-title-vcenter">
                  {title}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h4 className='mb-4'>Do you want to {type} this {object}?</h4>
                <p>
                  {message}
                </p>
              </Modal.Body>
              <Modal.Footer>
                <Button className='btn btn-danger' onClick={handleClick2}>Yes</Button>
                <Button className='btn btn-dark' onClick={handleClick}>No</Button>
              </Modal.Footer>
            </div>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
}