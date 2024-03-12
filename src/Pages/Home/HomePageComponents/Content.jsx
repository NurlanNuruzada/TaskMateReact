import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import CardList from '../../../Components/SideBarMenu/CardList/CardList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faUserGroup, faBriefcase, faCheck, faGlobe, faUserPlus, faLink } from '@fortawesome/free-solid-svg-icons';
import Styles from '../../../Components/SideBarMenu/SideBarMenu.module.css'

export default function Content() {
    const [modalShow, setModalShow] = useState(false);
    const [inputResult, setInputResult] = useState(false);
    return (
        <Col lg={10} className='h-100'>
            <Col lg={10} className={Styles.sideBarMenuTopMenuWrapper}>
                <Container style={{ padding: "12px 10px 12px 16px" }} fluid className={Styles.sideBarMenuTopMenu}>
                    <div className='d-flex align-items-center'>
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

                    <div className='d-flex align-items-center'>
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
                            <Image className='profile-pic' src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQcBR70-dRGg6OCJSvZ2xUzxQRN9F97n2CX2iekuDPjThLQQkt6" roundedCircle />
                            <Button onClick={() => setModalShow(true)} className={Styles.shareButton}><FontAwesomeIcon icon={faUserPlus} /> Share</Button>
                        </div>
                    </div>
                </Container>
            </Col>
        </Col>
    )
}
