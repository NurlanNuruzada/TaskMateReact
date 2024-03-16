import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Style from '../../../Components/HomePageSideBarMenu/HomePageSideBarMenu.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faUser, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import CustomModal from '../../../Components/CustomModal/CustomModal';


export default function Content() {
    const [modalShow, setModalShow] = useState(false);
    const updateParentState = (modalShow) => {
        setModalShow(modalShow);
    };
    return (
        <div className='w-100' style={{ overflowY: 'hidden', minHeight: '95vh' }}>
            <div className={Style.contentWrapper}>
                <div className={Style.contentTopNavBar}>
                    <div className='d-flex align-items-center'>
                        <Image className='workspace-pic' src="https://placehold.co/512x512/d9e3da/1d2125?text=S" rounded />
                        <span className='ms-3'>
                            <h2 className='m-0'>Sanan's Workspace</h2>
                            <p className="small m-0"><FontAwesomeIcon className='me-1' icon={faLock} /> Private</p>
                        </span>
                    </div>
                    <Button onClick={() => setModalShow(true)} className='btn btn-danger'><FontAwesomeIcon className='me-2' icon={faTrashCan} />Delete</Button>
                </div>
                <div className={Style.contentMain}>
                    <h5 className="m-0 mb-3"><FontAwesomeIcon className='me-1' icon={faUser} /> Your Boards</h5>
                    <div className='d-flex flex-wrap col-12'>
                        <Card className="bg-dark text-white col-2 rounded me-3">
                            <Card.Img src="https://picsum.photos/id/46/1920/1080.jpg" className='rounded board-overlay-image' alt="Card image" />
                            <Card.ImgOverlay className='board-overlay-title'>
                                <Card.Title className='fw-bold'>Lorem</Card.Title>
                            </Card.ImgOverlay>
                        </Card>
                        <Card className="bg-dark text-white col-2 rounded me-3">
                            <Card.Img src="https://picsum.photos/id/33/1920/1080.jpg" className='rounded board-overlay-image' alt="Card image" />
                            <Card.ImgOverlay className='board-overlay-title'>
                                <Card.Title className='fw-bold'>Ipsum</Card.Title>
                            </Card.ImgOverlay>
                        </Card>
                        <Card className="bg-dark text-white col-2 rounded me-3">
                            <Card.Img src="https://picsum.photos/id/47/1920/1080.jpg" className='rounded board-overlay-image' alt="Card image" />
                            <Card.ImgOverlay className='board-overlay-title'>
                                <Card.Title className='fw-bold'>Dolor</Card.Title>
                            </Card.ImgOverlay>
                        </Card>
                        <Card className="bg-dark text-white col-2 rounded me-3 board-overlay">
                            <Card.ImgOverlay className='board-overlay-title d-flex justify-content-center align-items-center'>
                                <Card.Title className='fw-bold m-0 fs-6'>Create new board</Card.Title>
                            </Card.ImgOverlay>
                        </Card>
                    </div>
                </div>
            </div>
            <CustomModal
                type={'delete'}
                object={'workspace'}
                message={'Are you sure you want to delete this workspace?'}
                title={'Delete Workspace'}
                show={modalShow}
                updateParentState={updateParentState}
            />
        </div>
    )
}
