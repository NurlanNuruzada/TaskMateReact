import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faUserGroup, faBriefcase, faCheck, faGlobe, faUserPlus, faLink, faChevronDown, faSignOut } from '@fortawesome/free-solid-svg-icons';
import Styles from '../../../Components/SideBarMenu/SideBarMenu.module.css'
import CardList from '../CardList/CardList'
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from '../../../Redux/Slices/AuthSlice'
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Flex
} from '@chakra-ui/react'
import { ChakraProvider } from '@chakra-ui/react';


export default function Content() {
    const [modalShow, setModalShow] = useState(false);
    const [inputResult, setInputResult] = useState(false);
    const { email } = useSelector((state) => state.auth); // Update the selector
    const dispatch = useDispatch();
    
    return (
        <div className='h-100 w-100' style={{ overflowY: 'hidden' }}>
            <Col lg={12} className={Styles.sideBarMenuTopMenuWrapper}>
                <Container fluid className={[Styles.sideBarMenuTopMenu, "flex-wrap flex-column flex-md-row"]}>
                    <div className='d-flex align-items-center col-8 col-md-6 justify-content-start'>
                        <h5 contentEditable id='boardName' className={Styles.boardName}>TaskMate</h5>
                        <div id="workspace-privacy-dropdown-wrapper" className={Styles.workspacePrivacyDropdownWrapper}>
                            <DropdownButton className={Styles.workspacePrivacyDropdown} title="Workspace Visibility">
                                <Dropdown.Item className='p-0 mb-1'>
                                    <Container className='px-3 py-1 my-1 selection-item'>
                                        <span className='text-default'>
                                            <FontAwesomeIcon className='text-danger me-1' icon={faLock} />
                                            Private
                                        </span>
                                        <p className="text-default m-0">Only board members can see this board.</p>
                                    </Container>
                                </Dropdown.Item>
                                <Dropdown.Item className='p-0 mb-1'>
                                    <Container className='px-3 py-1 my-1 selection-item'>
                                        <span className='text-default'>
                                            <FontAwesomeIcon className=' me-1' icon={faUserGroup} />
                                            Workspace
                                            <FontAwesomeIcon className='ms-1' icon={faCheck} />
                                        </span>
                                        <p className="text-default m-0">All members of the <span className='fw-bold'>TaskMate</span> Workspace can see and edit this board.</p>
                                    </Container>
                                </Dropdown.Item>
                                <Dropdown.Item className='p-0 mb-1'>
                                    <Container className='px-3 py-1 my-1 selection-item disabled'>
                                        <span>
                                            <FontAwesomeIcon className='me-1' icon={faBriefcase} />
                                            Organization
                                        </span>
                                        <p className="text-default m-0">All members of the organization can see this board. <br />The board must be added to an enterprise Workspace to enable this.</p>
                                    </Container>
                                </Dropdown.Item>
                                <Dropdown.Item className='p-0 mb-1'>
                                    <Container className='px-3 py-1 my-1 selection-item'>
                                        <span>
                                            <FontAwesomeIcon className='text-success me-1' icon={faGlobe} />
                                            Public
                                        </span>
                                        <p className="text-default m-0">Anyone on the internet can see this board. Only board members can edit.</p>
                                    </Container>
                                </Dropdown.Item>
                            </DropdownButton>
                        </div>
                    </div>

                    <div className='d-flex align-items-center col-8 col-md-6 justify-content-start justify-content-md-end'>
                        <div id="workspace-privacy-dropdown-wrapper" className={Styles.workspacePrivacyDropdownWrapper}>
                            <DropdownButton className={Styles.workspacePrivacyDropdown} title="Filters">
                                <Dropdown.Item className='p-0 mb-1'>
                                    <Container className='px-3 py-1 my-1 selection-item'>
                                        <span className='text-default'>
                                            <FontAwesomeIcon className='text-danger me-1' icon={faLock} />
                                            Private
                                        </span>
                                        <p className="text-default m-0">Only board members can see this board.</p>
                                    </Container>
                                </Dropdown.Item>
                                <Dropdown.Item className='p-0 mb-1'>
                                    <Container className='px-3 py-1 my-1 selection-item'>
                                        <span className='text-default'>
                                            <FontAwesomeIcon className=' me-1' icon={faUserGroup} />
                                            Workspace
                                            <FontAwesomeIcon className='ms-1' icon={faCheck} />
                                        </span>
                                        <p className="text-default m-0">All members of the <span className='fw-bold'>TaskMate</span> Workspace can see and edit this board.</p>
                                    </Container>
                                </Dropdown.Item>
                                <Dropdown.Item className='p-0 mb-1'>
                                    <Container className='px-3 py-1 my-1 selection-item disabled'>
                                        <span>
                                            <FontAwesomeIcon className='me-1' icon={faBriefcase} />
                                            Organization
                                        </span>
                                        <p className="text-default m-0">All members of the organization can see this board. <br />The board must be added to an enterprise Workspace to enable this.</p>
                                    </Container>
                                </Dropdown.Item>
                                <Dropdown.Item className='p-0 mb-1'>
                                    <Container className='px-3 py-1 my-1 selection-item'>
                                        <span>
                                            <FontAwesomeIcon className='text-success me-1' icon={faGlobe} />
                                            Public
                                        </span>
                                        <p className="text-default m-0">Anyone on the internet can see this board. Only board members can edit.</p>
                                    </Container>
                                </Dropdown.Item>
                            </DropdownButton>
                        </div>
                        <div className={Styles.profilesWrapper}>
                            {email && <ChakraProvider>
                                <Menu>
                                    <MenuButton  as={Button} righticon={<FontAwesomeIcon icon={faChevronDown} />} className={Styles.shareButton}>
                                        <Flex   alignItems={"center"}>
                                            <Image className='profile-pic me-2' src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQcBR70-dRGg6OCJSvZ2xUzxQRN9F97n2CX2iekuDPjThLQQkt6" rounded />
                                            {email}
                                        </Flex>
                                    </MenuButton>
                                    <MenuList  zIndex={10} className={Styles.userAccount}>
                                        <MenuItem  className='btn btn-primary default-submit mx-2' onClick={() => dispatch(logoutAction())}> <FontAwesomeIcon className='me-2' icon={faSignOut} /> Sign out</MenuItem>
                                    </MenuList>
                                </Menu>
                            </ChakraProvider>}
                            <Button onClick={() => setModalShow(true)} className={Styles.shareButton}><FontAwesomeIcon icon={faUserPlus} /> Share</Button>
                        </div>
                    </div>
                </Container>
            </Col>
            <Col lg={12} >
                <CardList />
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
        </div>
    )
}
