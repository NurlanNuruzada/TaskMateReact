import React, { useState, useEffect, useRef } from "react";
import Board, { BoardContainer } from "react-trello";
import Styles from "./CardList.module.css";
import { DataApi, transformBoardData } from "./Data";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBarsProgress,
  faEye,
  faAlignLeft,
  faListUl,
  faUser,
  faTag,
  faClock,
  faPaperclip,
  faPalette,
  faCopy,
  faSquareCheck,
  faArrowRight,
  faShareNodes,
} from "@fortawesome/free-solid-svg-icons";
import { FormControl, Input } from "@chakra-ui/react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import jwtDecode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { getByBoard } from "../../../Service/BoardService";
import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { useFormik } from "formik";
import { getByCard } from "../../../Service/CardService";

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
  color: "#9fadbc",
};

const CardList = () => {
  const [modalShow, setModalShow] = useState(false);
  const [boardData, setBoardData] = useState({ lanes: [] });
  const [cardListId, SetCardListId] = useState("");
  const [card, SetCard] = useState({});
  const eventBusRef = useRef(null);

  const { token } = useSelector((x) => x.auth);
  const queryClient = useQueryClient();

  const decodedToken = token ? jwtDecode(token) : null;
  const userId = decodedToken
    ? decodedToken[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
      ]
    : null;

  // const { id } = useParams();
  const id = "1135FDAF-2D43-455F-3D43-08DC45AA1307";
  const { data: byBoard } = useQuery(["BoardInCardList", id], () =>
    getByBoard(id)
  );
  console.log("tapdiq->", byBoard?.data[0]?.getCardListDtos);

  useEffect(() => {
    getBoard().then(setBoardData);
  }, []);

  const [dataApi, setDataApi] = useState(byBoard?.data);

  useEffect(() => {
    setDataApi(byBoard?.data ? byBoard?.data : byBoard?.data);
  }, [dataApi]);

  const getBoard = () => {
    const dataCopy = JSON.parse(JSON.stringify(transformBoardData(dataApi)));

    dataCopy.lanes.forEach((lane) => {
      lane.style = { ...ListStyle };
      lane.cards.forEach((card) => {
        card.cardStyle = { ...cardStyle };
      });
    });
    return Promise.resolve(dataCopy);
  };

  const completeCard = () => {
    if (eventBusRef.current) {
      eventBusRef.current.publish({
        type: "ADD_CARD",
        laneId: "COMPLETED",
        card: {
          id: "Milk",
          title: "Buy Milk",
          label: "15 mins",
          description: "Use Headspace app",
        },
      });
      eventBusRef.current.publish({
        type: "REMOVE_CARD",
        laneId: "PLANNED",
        cardId: "Milk",
      });
    }
  };

  const [dragCardId, setDragCardId] = useState();
  const [dragLineId, setDragLineId] = useState();

  const handleDragStart = (cardId, laneId) => {}; //El Deyme

  const handleDragEnd = (cardId, sourceLaneId, targetLaneId) => {
    setDragCardId(cardId);
    setDragLineId(targetLaneId);
  };

  useEffect(() => {
    if (dragCardId && dragLineId) {
      dragAndDropFormik.setValues({
        CardId: dragCardId,
        CardListId: dragLineId,
      });
      dragAndDropFormik.submitForm();
    }
  }, [dragCardId, dragLineId]);

  const dragAndDropFormik = useFormik({
    initialValues: {
      CardId: dragCardId,
      CardListId: dragLineId,
    },
    onSubmit: async (values) => {
      const formData = new FormData();

      formData.append("CardId", dragCardId);
      formData.append("CardListId", dragLineId);

      try {
        const response = await axios.put(
          "https://localhost:7101/api/Cards/UpdateCardDragAndDrop",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.status === 201) {
          queryClient.invalidateQueries(["BoardInCardList"]);
        }
      } catch (error) {}
    },
    // validationSchema: reservationScheme,
  });

  const addCard = () => {
    if (eventBusRef.current) {
      eventBusRef.current.publish({
        type: "ADD_CARD",
        laneId: "BLOCKED",
        card: {
          id: "Ec2Error",
          title: "EC2 Instance Down",
          label: "30 mins",
          description: "Main EC2 instance down",
        },
      });
    }
  };

  const shouldReceiveNewData = (nextData) => {
    console.log("New card has been added");
    console.log(nextData);
  };

  const formik = useFormik({
    initialValues: {
      Title: card.title,
      Description: card.description,
      CardListId: cardListId,
    },
    onSubmit: async (values) => {
      const formData = new FormData();

      formData.append("Title", card.title);
      formData.append("Description", card.description);
      formData.append("CardListId", cardListId);

      try {
        const response = await axios.post(
          "https://localhost:7101/api/Cards",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.status === 201) {
          queryClient.invalidateQueries(["BoardInCardList"]);
        }
      } catch (error) {}
    },
    // validationSchema: reservationScheme,
  });

  const handleCardAdd = (card, laneId) => {
    SetCard(card);
    SetCardListId(laneId);
  };

  useEffect(() => {
    if (card?.title && cardListId) {
      formik.setValues({ Title: card.title, CardListId: cardListId });
      formik.submitForm();
    }
  }, [card, cardListId]);

  const setEventBus = (eventBus) => {
    eventBusRef.current = eventBus;
  };

  const [cardId, setCardId] = useState(null);

  const handleCardClick = (cardId, metadata, laneId) => {
    setModalShow(true);
    setCardId(cardId);
  };

  const { data: thisCard, isSuccess } = useQuery(
    ["Card", cardId],
    () => getByCard(cardId),
    {
      enabled: !!cardId,
    }
  );

  const reservFormik = useFormik({
    initialValues: {
      AppUserId: userId,
      Title: "",
      BoardsId: byBoard?.data[0].getCardListDtos[0].boardsId,
    },
    onSubmit: async (values) => {
      const formData = new FormData();

      formData.append("AppUserId", userId);
      formData.append("Title", values.Title);
      formData.append("BoardsId", byBoard?.data[0].getCardListDtos[0].boardsId);

      try {
        const response = await axios.post(
          "https://localhost:7101/api/CardLists",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.status === 201) {
          queryClient.invalidateQueries(["BoardInCardList"]);
        }
      } catch (error) {}
    },
    // validationSchema: reservationScheme,
  });

  return (
    <div className="h-100">
      <div style={{ display: "flex" }}>
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
        <div className={Styles.createCardList}>
          <form onSubmit={reservFormik.handleSubmit}>
            <FormControl>
              <label htmlFor="Title">Card List Name</label>
              <Input
                isInvalid={
                  reservFormik.errors.Title && reservFormik.touched.Title
                }
                name="Title"
                value={reservFormik.values.Title}
                onChange={reservFormik.handleChange}
                placeholder="Card List Title"
                size="sm"
              />
              <Button className={Styles.createcardlistbtn} type="submit">
                Create
              </Button>
            </FormControl>
          </form>
        </div>
      </div>
      <Modal
        show={modalShow}
        onHide={() => {
          setModalShow(false);
        }}
        size="lg"
        fullscreen="md-down"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="create-share-link-modal"
      >
        {thisCard?.data ? (
          <Modal.Body
            className="p-3 mb-3 position-relative"
            id="contained-modal-title-vcenter"
          >
            <Modal.Title>
              <div className="container-fluid position-relative mt-2">
                <Card.Body className=" p-0px-1 position-relative d-flex">
                  <span className="me-3 fs-5">
                    <FontAwesomeIcon icon={faBarsProgress} />
                  </span>
                  <div className="py-1">
                    <Card.Subtitle className="mb-2 fs-5">
                      {" "}
                      {thisCard?.data.title}{" "}
                    </Card.Subtitle>
                    <Card.Text className="small fs-6">
                      in list{" "}
                      <a className="btn-anchor" href="">
                        Planned Tasks
                      </a>
                    </Card.Text>
                  </div>
                  <Button
                    className="create-workspace-close btn-close position-absolute top-50 end-0 translate-middle-y"
                    onClick={() => setModalShow(false)}
                  ></Button>
                </Card.Body>
              </div>
            </Modal.Title>
            <div className="w-100 d-flex container-fluid">
              <div className="me-2 w-75">
                <div className="position-relative mt-2">
                  <Card.Body className=" p-0 py-3 px-1 position-relative d-flex">
                    <span className="me-3 fs-6">
                      <FontAwesomeIcon icon={faEye} />
                    </span>
                    <div>
                      <p className="mb-2">Notifications</p>
                      <button className="btn btn-primary default-submit">
                        Watch
                      </button>
                    </div>
                  </Card.Body>
                </div>
                <div className="position-relative mt-2">
                  <Card.Body className=" p-0 px-1 position-relative d-flex">
                    <span className="mt-1 me-3 fs-4">
                      <FontAwesomeIcon icon={faAlignLeft} />
                    </span>
                    <div className="py-2">
                      <Card.Subtitle className="mb-2 fs-5">
                        {" "}
                        Description{" "}
                      </Card.Subtitle>
                      <Form.Group
                        className="my-3"
                        controlId="create-workspace-desc"
                      >
                        <Form.Control as="textarea" rows={3} cols={80} />
                      </Form.Group>
                    </div>
                  </Card.Body>
                </div>
                <div className="position-relative mt-2">
                  <Card.Body className=" p-0 px-1 position-relative d-flex">
                    <span className="mt-1 me-3 fs-4">
                      <FontAwesomeIcon icon={faListUl} />
                    </span>
                    <div className="py-2 w-100">
                      <Card.Subtitle className="mb-2 fs-5 d-flex justify-content-between">
                        {" "}
                        Activity{" "}
                        <button className="btn btn-primary default-submit">
                          Show details
                        </button>
                      </Card.Subtitle>
                    </div>
                  </Card.Body>
                  <div className="d-flex align-items-center">
                    <Image
                      className={Styles.workspacePic}
                      src="https://placehold.co/512x512/CDD3FF/1d2125?text=T"
                      roundedCircle
                    />
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
                <div className="container-fluid position-relative mt-2">
                  <Card.Body className=" p-0 py-3 px-1 position-relative">
                    <p className="mb-2 small fw-bold">Add to Card</p>
                    <div>
                      <button className="btn btn-primary default-submit mb-2 w-100 text-start">
                        <FontAwesomeIcon className="me-2" icon={faUser} />
                        Members
                      </button>
                      <button className="btn btn-primary default-submit mb-2 w-100 text-start">
                        <FontAwesomeIcon className="me-2" icon={faTag} />
                        Labels
                      </button>
                      <button className="btn btn-primary default-submit mb-2 w-100 text-start">
                        <FontAwesomeIcon
                          className="me-2"
                          icon={faSquareCheck}
                        />
                        Checklist
                      </button>
                      <button className="btn btn-primary default-submit mb-2 w-100 text-start">
                        <FontAwesomeIcon className="me-2" icon={faClock} />
                        Dates
                      </button>
                      <button className="btn btn-primary default-submit mb-2 w-100 text-start">
                        <FontAwesomeIcon className="me-2" icon={faPaperclip} />
                        Attachment
                      </button>
                      <button className="btn btn-primary default-submit mb-2 w-100 text-start">
                        <FontAwesomeIcon className="me-2" icon={faPalette} />
                        Cover
                      </button>
                    </div>
                    <p className="mt-5 mb-2 small fw-bold">Actions</p>
                    <div>
                      <button className="btn btn-primary default-submit mb-2 w-100 text-start">
                        <FontAwesomeIcon className="me-2" icon={faArrowRight} />
                        Move
                      </button>
                      <button className="btn btn-primary default-submit mb-2 w-100 text-start">
                        <FontAwesomeIcon className="me-2" icon={faCopy} />
                        Copy
                      </button>
                      <button className="btn btn-primary default-submit mb-2 w-100 text-start">
                        <FontAwesomeIcon className="me-2" icon={faShareNodes} />
                        Share
                      </button>
                    </div>
                  </Card.Body>
                </div>
              </div>
            </div>
          </Modal.Body>
        ) : (
          ""
        )}
      </Modal>
    </div>
  );
};

export default CardList;
