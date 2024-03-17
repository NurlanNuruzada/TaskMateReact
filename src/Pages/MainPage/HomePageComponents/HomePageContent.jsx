import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Style from '../../../Components/HomePageSideBarMenu/HomePageSideBarMenu.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faUser, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import CustomModal from '../../../Components/CustomModal/CustomModal';
import { useMutation } from 'react-query';
import { GetWorkSpaceById } from '../../../Service/WorkSpaceService';
import { useSelector } from 'react-redux';
import { getbyWokrspaceInBoard } from '../../../Service/BoardService';
import { useNavigate } from 'react-router';



export default function Content() {
    const [modalShow, setModalShow] = useState(false);
    const [Data, setData] = useState()
    const [Boards, setBoards] = useState()
    const [Render, setRender] = useState();
    const { workspaceId, refresh } = useSelector((x) => x.Data)
    useEffect(() => {
        setRender(refresh);
    }, [refresh]);

    const Navigate = useNavigate()
    const cleanURL = () => {
        const cleanURL = window.location.origin + window.location.pathname;
        window.history.replaceState({}, document.title, cleanURL);
    };
    useEffect(() => {
        cleanURL();
    }, []);
    const updateParentState = (modalShow) => {
        setModalShow(modalShow);
    };
    const { mutate: GetBoardsById } = useMutation((values) =>
        getbyWokrspaceInBoard(values), {
        onSuccess: (response) => {
            setBoards(response.data)
        },
        onError: (error) => {
            console.log(error);
        }
    })
    const { mutate: GetworksById } = useMutation((values) =>
        GetWorkSpaceById(values), {
        onSuccess: (response) => {
            setData(response.data)
            GetBoardsById(response.data.id)
        },
        onError: (error) => {
            console.log(error);
        }
    })
    useEffect(() => {
        GetworksById(workspaceId)
    }, [workspaceId])

    //her defe board crate olunanda headerden userid ni yeniden local a set edir
    useEffect(() => {
        GetBoardsById(workspaceId)
        GetworksById(workspaceId)
    }, [Render])
    return (
        <div className='w-100' style={{ overflowY: 'hidden', minHeight: '95vh' }}>
            <div style={{ color: '#b6c2cf' }} className={Style.contentWrapper}>
                <div className={Style.contentTopNavBar}>
                    <div className='d-flex align-items-center'>
                        <Image className='workspace-pic' src={`https://placehold.co/512x512/d9e3da/1d2125?text=${Data?.title.slice(
                            0,
                            1
                        )}`} rounded />
                        <span className='ms-3'>
                            <h2 className='m-0'>{Data?.title}</h2>
                            <p className="small m-0"><FontAwesomeIcon className='me-1' icon={faLock} /> Private</p>
                        </span>
                    </div>
                </div>
                <div className={Style.contentMain}>
                    <h5 className="m-0 mb-3"><FontAwesomeIcon className='me-1' icon={faUser} /> Your Boards</h5>
                    <div className='d-flex flex-wrap col-12'>
                        {Boards && Boards.map((data, index) => {
                            return (
                                <Card onClick={() => Navigate(`/Boards/${data.id}`)} key={index} className="bg-dark text-white col-2 rounded me-3 board-overlay-card">
                                    <Card.Img src="https://picsum.photos/id/46/1920/1080.jpg" className='rounded board-overlay-image' alt="Card image" />
                                    <Card.ImgOverlay className='board-overlay-title'>
                                        <Card.Title className='fw-bold'>{data.title}</Card.Title>
                                    </Card.ImgOverlay>
                                </Card>
                            )
                        })}
                        {/* Yuxari hissede boards eger 1 den coxsursa map edir */}
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
