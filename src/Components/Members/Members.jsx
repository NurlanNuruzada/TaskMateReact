import React, { useState } from 'react'
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import Style from './Members.module.css';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faLink, faUserPlus } from '@fortawesome/free-solid-svg-icons';

export default function Members() {
    const [modalShow, setModalShow] = useState(false);
    const [inputResult, setInputResult] = useState(false);
    return (
        <>
            <div className='w-100' style={{ overflowY: 'hidden', minHeight: '95vh' }}>
                <div className={Style.contentWrapper}>
                    <Col sm={10} className={Style.contentTopNavBar}>
                        <div className='d-flex align-items-center'>
                            <Image className='workspace-pic' src="https://placehold.co/512x512/d9e3da/1d2125?text=S" rounded />
                            <span className='ms-3'>
                                <h2 className='m-0'>Sanan's Workspace</h2>
                                <p className="small m-0"><FontAwesomeIcon className='me-1' icon={faLock} /> Private</p>
                            </span>
                        </div>
                        <Button onClick={() => setModalShow(true)} className={Style.shareButton}><FontAwesomeIcon icon={faUserPlus} /> Invite workspace members</Button>
                    </Col>
                    <div className='col-11'>
                        <h4 className='fw-bold mb-3'>Collaborators (1)</h4>
                        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                            <div className='d-flex justify-content-between'>
                                <Col className='me-3' sm={3}>
                                    <Nav variant="pills" className="flex-column col-10">
                                        <Nav.Item>
                                            <Nav.Link className='fw-bold fs-6 default-outline-dark-submit' eventKey="first">Workspace Members (1)</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item className='my-2'>
                                            <Nav.Link className='fw-bold default-outline-dark-submit' eventKey="second">Guests (0)</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link className='fw-bold default-outline-dark-submit' eventKey="third">Join request (0)</Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </Col>
                                <Col sm={9}>
                                    <Tab.Content>
                                        <Tab.Pane eventKey="first">
                                            <div>
                                                <h3>Workspace members (1)</h3>
                                                <p>Workspace members can view and join all Workspace visible boards and create new boards in the Workspace.</p>
                                            </div>
                                            <div className='mt-5 mb-3 tab-footer'>
                                                <h5>Invite members to join you</h5>
                                                <span className='d-flex justify-content-between mb-2'>
                                                    <p className='col-6'>Anyone with an invite link can join this free Workspace. You can also disable and create a new invite link for this Workspace at any time. Pending invitations count toward the 10 collaborator limit.</p>
                                                    <span className='col-5'>
                                                        <Button className='btn fw-bold w-100 mb-2 default-submit me-3'>Invite with link</Button>
                                                        <Button className='btn fw-bold w-100 default-outline-submit'>Disable invite link</Button>
                                                    </span>
                                                </span>
                                            </div>
                                            <div>
                                                <Form>
                                                    <Form.Group className="mb-1" controlId="create-workspace-name">
                                                        <div className='d-flex align-items-center'>
                                                            <div className='w-100 position-relative me-2'>
                                                                <Form.Control
                                                                    type="text"
                                                                    placeholder="e.g. calrissian@cloud.ci"
                                                                />
                                                            </div>
                                                        </div>
                                                    </Form.Group>
                                                </Form>
                                                <div className="tab-footer mt-3">
                                                    Salam
                                                </div>
                                            </div>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="second">
                                            <div>
                                                <h3>Guests (0)</h3>
                                                <p>Guests can only view and edit the boards to which they've been added.</p>
                                            </div>
                                            <div className='mt-5 tab-footer'>
                                                <p className='m-0 py-3 fst-italic text-center'>There are no guests in this Workspace.</p>
                                            </div>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="third">
                                            <div>
                                                <h3>Join requests (0)</h3>
                                                <p>These people have requested to join this Workspace. All Workspace members are admins and can edit Workspace settings.</p>
                                            </div>
                                            <div className='mt-5 tab-footer'>
                                                <p className='fst-italic text-center'>There are no join requests.</p>
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
                                                        </div>
                                                    </Form.Group>
                                                </Form>
                                            </div>
                                        </Tab.Pane>
                                    </Tab.Content>
                                </Col>
                            </div>
                        </Tab.Container>
                    </div>
                </div>
            </div>
            <Modal
                show={modalShow}
                onHide={() => { setModalShow(false); }}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className='create-share-link-modal'
            >
                <Modal.Body className='p-0 position-relative' id="contained-modal-title-vcenter">
                    <Row className='p-0 d-flex flex-nowrap'>
                        <div className='py-4 px-5'>
                            <Modal.Title className='fw-bold mb-4 d-flex justify-content-between align-items-center' id="contained-modal-title-vcenter">
                                <span>Share Board</span>
                                <Button className='create-workspace-close btn-close' onClick={() => setModalShow(false)}></Button>
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
                                            <Button className={Style.modalShareButton}>Share</Button>
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
        </>
    );
}