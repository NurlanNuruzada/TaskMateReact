import React, { useState, useEffect, useRef } from 'react';
import Board from 'react-trello';
import Styles from './CardList.module.css'
import { DataApi, transformBoardData } from './Data';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBarsProgress, faEye, faAlignLeft, faListUl, faUser, faTag, faClock, faPaperclip, faPalette, faCopy, faSquareCheck, faArrowRight, faShareNodes } from '@fortawesome/free-solid-svg-icons';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import jwtDecode from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { getByBoard } from "../../../Service/BoardService";
import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from 'axios';
import { useFormik } from "formik";


const handleDragStart = (cardId, laneId) => {
  console.log('drag started');
  console.log(`cardId: ${cardId}`);
  console.log(`laneId: ${laneId}`);
};

const ListStyle = {
  width: "280px",
  backgroundColor: "#101204",
  borderRadius: "14px",
  marginRight: "10px",
  padding: "10px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
  color: "#9fadbc",
};

const cardStyle = {
  width: "260px",
  maxWidth: "260px",
  margin: "auto",
  marginBottom: "8px",
  borderRadius: "14px",
  backgroundColor: "#22272b",
  boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
  padding: "6px 8px",
  boxSizing: "border-box",
  color: "#9fadbc"
};



const handleDragEnd = (cardId, sourceLaneId, targetLaneId) => {
  console.log('drag ended');
  console.log(`cardId: ${cardId}`);
  console.log(`sourceLaneId: ${sourceLaneId}`);
  console.log(`targetLaneId: ${targetLaneId}`);
};

const CardList = () => {

  const [modalShow, setModalShow] = useState(false);
  const [boardData, setBoardData] = useState({ lanes: [] });
  const [cardListId, SetCardListId] = useState();
  const [card, SetCard] = useState();
  const eventBusRef = useRef(null);

  const { token } = useSelector((x) => x.auth)
  const queryClient = useQueryClient();


  const decodedToken = token ? jwtDecode(token) : null;
  const userId = decodedToken ? decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] : null;

  // const { id } = useParams();
  const id = "e94d0eb9-df9e-4222-58c7-08dc4536cb6c";
  const { data: byBoard } = useQuery(["Board", id], () =>
    getByBoard(id)
  );

  useEffect(() => {
    getBoard().then(setBoardData);
  }, []);


  const [dataApi, setDataApi] = useState(byBoard?.data);

  useEffect(()=> {
    setDataApi(byBoard?.data ? byBoard?.data : byBoard?.data);
  },[dataApi])

  const getBoard = () => {
    const dataCopy = JSON.parse(JSON.stringify(transformBoardData(dataApi)));

    dataCopy.lanes.forEach(lane => {
      lane.style = { ...ListStyle };
      lane.cards.forEach(card => {
        card.cardStyle = { ...cardStyle };
      });
    });
    return Promise.resolve(dataCopy);
  };

  const completeCard = () => {
    if (eventBusRef.current) {
      eventBusRef.current.publish({
        type: 'ADD_CARD',
        laneId: 'COMPLETED',
        card: {
          id: 'Milk',
          title: 'Buy Milk',
          label: '15 mins',
          description: 'Use Headspace app',
        },
      });
      eventBusRef.current.publish({
        type: 'REMOVE_CARD',
        laneId: 'PLANNED',
        cardId: 'Milk',
      });
    }
  };

  const addCard = () => {
    if (eventBusRef.current) {
      eventBusRef.current.publish({
        type: 'ADD_CARD',
        laneId: 'BLOCKED',
        card: {
          id: 'Ec2Error',
          title: 'EC2 Instance Down',
          label: '30 mins',
          description: 'Main EC2 instance down',
        },
      });
    }
  };

  const shouldReceiveNewData = (nextData) => {
    console.log('New card has been added');
    console.log(nextData);
  };

  
  const handleCardAdd = (card, laneId) => {
    SetCard(card);
    SetCardListId(laneId);
  };

  const setEventBus = (eventBus) => {
    eventBusRef.current = eventBus;
  };


  const handleCardClick = (cardId, metadata, laneId) => {
    setModalShow(true);
  };

  return (
    <div className='h-100'>
      <Board
        className={Styles.Board}
        editable
        onCardAdd={handleCardAdd}
        data={boardData}
        draggable
        onDataChange={shouldReceiveNewData}
        eventBusHandle={setEventBus}
        handleDragStart={handleDragStart}
        handleDragEnd={handleDragEnd}
        onCardClick={handleCardClick}
      />
      <Modal
        show={modalShow}
        onHide={() => { setModalShow(false); }}
        size="lg"
        fullscreen='md-down'
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className='create-share-link-modal'
      >
        <Modal.Body className='p-3 mb-3 position-relative' id="contained-modal-title-vcenter">
          <Modal.Title>
            <div className='container-fluid position-relative mt-2'>
              <Card.Body className=' p-0px-1 position-relative d-flex'>
                <span className='me-3 fs-5'><FontAwesomeIcon icon={faBarsProgress} /></span>
                <div className='py-1'>
                  <Card.Subtitle className='mb-2 fs-5'> Buy milk </Card.Subtitle>
                  <Card.Text className='small fs-6'>
                    in list <a className='btn-anchor' href="">Planned Tasks</a>
                  </Card.Text>
                </div>
                <Button className='create-workspace-close btn-close position-absolute top-50 end-0 translate-middle-y' onClick={() => setModalShow(false)}></Button>
              </Card.Body>
            </div>
          </Modal.Title>
          <div className="w-100 d-flex container-fluid">
            <div className='me-2 w-75'>
              <div className='position-relative mt-2'>
                <Card.Body className=' p-0 py-3 px-1 position-relative d-flex'>
                  <span className='me-3 fs-6'><FontAwesomeIcon icon={faEye} /></span>
                  <div>
                    <p className='mb-2'>Notifications</p>
                    <button className='btn btn-primary default-submit'>Watch</button>
                  </div>
                </Card.Body>
              </div>
              <div className='position-relative mt-2'>
                <Card.Body className=' p-0 px-1 position-relative d-flex'>
                  <span className='mt-1 me-3 fs-4'><FontAwesomeIcon icon={faAlignLeft} /></span>
                  <div className='py-2'>
                    <Card.Subtitle className='mb-2 fs-5' > Description </Card.Subtitle>
                    <Form.Group
                      className="my-3"
                      controlId="create-workspace-desc"
                    >
                      <Form.Control as="textarea" rows={3} cols={80} />
                    </Form.Group>
                  </div>
                </Card.Body>
              </div>
              <div className='position-relative mt-2'>
                <Card.Body className=' p-0 px-1 position-relative d-flex'>
                  <span className='mt-1 me-3 fs-4'><FontAwesomeIcon icon={faListUl} /></span>
                  <div className='py-2 w-100'>
                    <Card.Subtitle className='mb-2 fs-5 d-flex justify-content-between' > Activity <button className='btn btn-primary default-submit'>Show details</button></Card.Subtitle>
                  </div>
                </Card.Body>
                <div className='d-flex align-items-center'>
                  <Image className={Styles.workspacePic} src="https://placehold.co/512x512/CDD3FF/1d2125?text=T" roundedCircle />
                  <Form.Group
                    className="my-3 ms-2"
                    controlId="create-workspace-desc"
                  >
                    <Form.Control as="textarea" rows={1} cols={80} />
                  </Form.Group>
                </div>
              </div>
            </div>
            <div className="ms-2 w-25 h-100">
              <div className='container-fluid position-relative mt-2'>
                <Card.Body className=' p-0 py-3 px-1 position-relative'>
                  <p className='mb-2 small fw-bold'>Add to Card</p>
                  <div>
                    <button className='btn btn-primary default-submit mb-2 w-100 text-start'><FontAwesomeIcon className='me-2' icon={faUser} />Members</button>
                    <button className='btn btn-primary default-submit mb-2 w-100 text-start'><FontAwesomeIcon className='me-2' icon={faTag} />Labels</button>
                    <button className='btn btn-primary default-submit mb-2 w-100 text-start'><FontAwesomeIcon className='me-2' icon={faSquareCheck} />Checklist</button>
                    <button className='btn btn-primary default-submit mb-2 w-100 text-start'><FontAwesomeIcon className='me-2' icon={faClock} />Dates</button>
                    <button className='btn btn-primary default-submit mb-2 w-100 text-start'><FontAwesomeIcon className='me-2' icon={faPaperclip} />Attachment</button>
                    <button className='btn btn-primary default-submit mb-2 w-100 text-start'><FontAwesomeIcon className='me-2' icon={faPalette} />Cover</button>
                  </div>
                  <p className='mt-5 mb-2 small fw-bold'>Actions</p>
                  <div>
                    <button className='btn btn-primary default-submit mb-2 w-100 text-start'><FontAwesomeIcon className='me-2' icon={faArrowRight} />Move</button>
                    <button className='btn btn-primary default-submit mb-2 w-100 text-start'><FontAwesomeIcon className='me-2' icon={faCopy} />Copy</button>
                    <button className='btn btn-primary default-submit mb-2 w-100 text-start'><FontAwesomeIcon className='me-2' icon={faShareNodes} />Share</button>
                  </div>
                </Card.Body>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CardList;
