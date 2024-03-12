import React, { useState, useEffect, useRef } from 'react';
import Board from 'react-trello';
import Styles from './CardList.module.css'
import { DataApi } from './Data';
import Modal from 'react-bootstrap/Modal';


const handleDragStart = (cardId, laneId) => {
  console.log('drag started');
  console.log(`cardId: ${cardId}`);
  console.log(`laneId: ${laneId}`);
};

const ListStyle = {
  width: "280px",
  backgroundColor: "#ebecf0",
  borderRadius: "14px",
  marginRight: "10px",
  padding: "10px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.2)"
};

const cardStyle = {
  width: "260px",
  maxWidth: "260px",
  margin: "auto",
  marginBottom: "8px",
  borderRadius: "14px",
  backgroundColor: "#fff",
  boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
  padding: "6px 8px",
  boxSizing: "border-box"
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
  const eventBusRef = useRef(null);

  useEffect(() => {
    getBoard().then(setBoardData);
  }, []);

  const getBoard = () => {
    const dataCopy = JSON.parse(JSON.stringify(DataApi[0]));

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
    console.log(`New card added to lane ${laneId}`);
    console.dir(card);
  };

  const setEventBus = (eventBus) => {
    eventBusRef.current = eventBus;
  };


  const handleCardClick = (cardId, metadata, laneId) => {
    setModalShow(true);
  };

  return (
    <div>
      <Board
        style={{ background: 'transparent' }}
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
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className='create-share-link-modal'
      >
        <Modal.Body className='p-0 position-relative' id="contained-modal-title-vcenter">
          Salam
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CardList;
