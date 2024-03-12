import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Styles from './SideBarMenu.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faUserGroup, faBriefcase, faCheck, faGlobe, faUserPlus, faLink } from '@fortawesome/free-solid-svg-icons';
import CardList from "./CardList/CardList";

export default function SideBarMenu() {
  const [modalShow, setModalShow] = useState(false);
  const [inputResult, setInputResult] = useState(false);
  return (
    <>
      <Col  className={Styles.sideBarMenuWrapper}>
        <Col className={Styles.sideBarMenu} lg={12}>
          <Container className={Styles.sideBarMenuWorkspaceName} fluid>
            <Image className={Styles.workspacePic} src="https://placehold.co/512x512/CDD3FF/1d2125?text=T" rounded />
            <div className='ms-2'>
              <p className='m-0 fw-bold'>Trello Workspace</p>
              <p className='m-0 small'>Free</p>
            </div>
          </Container>
        </Col>
        <div>
          <Modal
            show={modalShow}
            onHide={() => { setModalShow(false); }}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className='create-share-link-modal'
          >
            <Modal.Body className='p-0 position-relative' id="contained-modal-title-vcenter">
              <Button className='create-workspace-close btn-close position-absolute top-0 end-0 mt-5 me-4' onClick={() => setModalShow(false)}></Button>
              <Row className='p-0 d-flex flex-nowrap'>

                <div className='p-5'>
                  <Modal.Title className='fw-bold mb-4' id="contained-modal-title-vcenter">
                    Share Board
                  </Modal.Title>
                  <Form>
                    <Form.Group className="mb-1" controlId="create-workspace-name">
                      <div className='d-flex align-items-center'>
                        <div className='w-100 position-relative me-2'>
                          <Form.Control
                            type="text"
                            placeholder="e.g. calrissian@cloud.ci"
                            onFocus={() => { setInputResult(true); }}
                            onBlur={() => setInputResult(false)}
                          />
                          {inputResult ? (
                            <Card className='custom-card p-3 mt-1 position-absolute w-100'>
                              <div className='d-flex align-items-center search-result'>
                                <img className='rounded-circle me-2' style={{ width: '36px', height: '36px' }} src="https://picsum.photos/200/300.jpg" alt="" />
                                <div>
                                  <p className='m-0 small'>Sanan Dalbik</p>
                                  <p className='m-0 small'>Hasn't logged in recently</p>
                                </div>
                              </div>
                            </Card>
                          ) : ''}
                        </div>
                        <div className='d-flex align-items-center'>
                          <Dropdown>
                            <Dropdown.Toggle className='defaultDropdown fw-bold' variant="primary" id="dropdown-basic">
                              Member
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              <Dropdown.Item className='defaultDropdown-link px-3 py-2' href="#">Member</Dropdown.Item>
                              <Dropdown.Item className='defaultDropdown-link px-3 py-2' href="#">
                                Observer
                                <br />
                                <span className='small'>Add people with limited
                                  permissions <br /> to this board</span>
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                          <Button className={Styles.modalShareButton}>Share</Button>
                        </div>
                      </div>
                    </Form.Group>
                  </Form>
                  <div className='d-flex justify-content-between align-items-center mt-3'>
                    <div className='d-flex align-items-center'>
                      <span className='p-2 rounded btn-outline-default me-2'><FontAwesomeIcon icon={faLink} /></span>
                      <span>
                        <p className='m-0'>Anyone with the board share link</p>
                        <a className='btn-anchor' href="">Copy Link</a>
                      </span>
                    </div>
                    <Dropdown>
                      <Dropdown.Toggle className='defaultDropdown fw-bold' variant="primary" id="dropdown-basic">
                        Can join as member
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item className='defaultDropdown-link px-3 py-2' href="#">
                          Can join as member
                          <br />
                          <span className='small'>Board members can view and edit cards, <br />
                            lists, and some board settings.</span>
                        </Dropdown.Item>
                        <Dropdown.Item className='defaultDropdown-link px-3 py-2' href="#">
                          Can join as observer
                          <br />
                          <span className='small'>Board observers can view and comment.</span>
                        </Dropdown.Item>
                        <Dropdown.Item className='defaultDropdown-link px-3 py-2' href="#">
                          Delete Link
                          <br />
                          <span className='small'>The existing board share link will no longer work.</span>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                  <div className='d-flex justify-content-between align-items-center mt-3'>
                    <div className='d-flex'>
                      <Image className='profile-pic me-2' src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQcBR70-dRGg6OCJSvZ2xUzxQRN9F97n2CX2iekuDPjThLQQkt6" roundedCircle />
                      <span className='ms-1'>
                        <h6 className='m-0'>Hasbulla Gasimov (you)</h6>
                        <p className="m-0">@hasbullagasim  •  Workspace admin</p>
                      </span>
                    </div>
                    <Dropdown>
                      <Dropdown.Toggle className='defaultDropdown fw-bold' variant="primary" id="dropdown-basic">
                        Admin
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item className='defaultDropdown-link px-3 py-2' href="#">
                          Admin
                        </Dropdown.Item>
                        <Dropdown.Item className='defaultDropdown-link px-3 py-2' href="#">
                          Member
                          <br />
                          <span className='small'>Boards must have at least one admin.</span>
                        </Dropdown.Item>
                        <Dropdown.Item className='defaultDropdown-link px-3 py-2' href="#">
                          Observer
                          <br />
                          <span className='small'>Add people with limited permissions to this board.</span>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
              </Row>
            </Modal.Body>
          </Modal>
        </div>
      </Col >
    </>

  );
}