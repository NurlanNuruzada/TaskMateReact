import React, { useState, useEffect, useRef } from "react";
import Board from "react-trello";
import Styles from "./CardList.module.css";
import { transformBoardData } from "./Data";
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
  faXmark,
  faX,
  faEllipsis,
  faTrash,

} from "@fortawesome/free-solid-svg-icons";
import { Box, ChakraProvider, Flex, FormControl, Input, Portal, Text, useDisclosure, } from "@chakra-ui/react";
import Card from "react-bootstrap/Card";
import { Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverCloseButton, PopoverBody, PopoverFooter } from "@chakra-ui/react";

import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import { useSelector } from "react-redux";
import { getByBoard } from "../../../Service/BoardService";
import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { useFormik } from "formik";
import { getByCard, getCardDelete } from "../../../Service/CardService";
import { Button, Dropdown } from "react-bootstrap";
import {
  MenuItem,
  Menu,
  MenuButton,
  MenuList
} from '@chakra-ui/react'
import TextEditor from "./TextEditor/TextEditor";
import { CreateChecklist, CreateChecklistitem, DeleteChecklist, DeleteChecklistItem, GetAllChecklist, UpdateChecklistItem } from "../../../Service/CheckListService";
import { Progress } from '@chakra-ui/react'
import { Checkbox, CheckboxGroup } from '@chakra-ui/react'
import { Select } from '@chakra-ui/react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Col } from "react-bootstrap";

const data = require('./data.json')
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
  const [moveModalShow, setMoveModalShow] = useState(false);
  const [cardDateModalShow, setCardDateModalShow] = useState(false);


  const [boardData, setBoardData] = useState({ lanes: [] });
  const [cardListId, SetCardListId] = useState("");
  const { BoardId, userId } = useSelector((x) => x.Data)
  const [BId, setBoardId] = useState(BoardId)
  const [card, SetCard] = useState({});
  const eventBusRef = useRef(null);

  const queryClient = useQueryClient();
  const { data: byBoard } = useQuery(["BoardInCardList", BoardId?.id], () =>
    getByBoard(BoardId)
  );
  const [dataApi, setDataApi] = useState(byBoard?.data);
  useEffect(() => {
    if (byBoard?.data) {
      setDataApi(byBoard.data);
    }
  }, [byBoard]);
  useEffect(() => {
    const fetchData = async () => {
      const newBoardData = await getBoard();
      setBoardData(newBoardData);
    };
    fetchData();
  }, [dataApi]);

  const getBoard = async () => {
    const dataCopy = JSON.parse(JSON.stringify(transformBoardData(dataApi)));

    dataCopy.lanes.forEach((lane) => {
      lane.style = { ...ListStyle };
      lane.cards.forEach((card) => {
        card.cardStyle = { ...cardStyle };
      });
    });
    return dataCopy;
  };
  const [dragCardId, setDragCardId] = useState();
  const [dragLineId, setDragLineId] = useState();

  const handleDragStart = (cardId, laneId) => { }; //El Deyme

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
      } catch (error) { }
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
  const [updateCard, setUpdateCard] = useState(null);

  const shouldReceiveNewData = (nextData) => {
    const updatedCards = findUpdatedCards(boardData, nextData);
    setUpdateCard(updatedCards);
    if (updateCard !== null) {
      updateCardFormik.submitForm();
    }
  };

  const updateCardFormik = useFormik({
    initialValues: {
      CardId: updateCard && updateCard.length > 0 ? updateCard[0].id : '',
      Title: updateCard && updateCard.length > 0 ? updateCard[0].title : '',
      Description: updateCard && updateCard.length > 0 ? updateCard[0].description : '',
    },
    onSubmit: async (values) => {
      const formData = new FormData();

      formData.append("CardId", values.CardId);
      formData.append("Title", values.Title);
      formData.append("Description", values.Description);

      try {
        const response = await axios.put(
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
      } catch (error) { }
    },
    // validationSchema: reservationScheme,
  });

  useEffect(() => {
    if (updateCard && updateCard.length > 0 && updateCardFormik) {
      updateCardFormik.setValues({
        CardId: updateCard[0].id,
        Title: updateCard[0].title,
        Description: updateCard[0].description,
      });
    }
  }, [updateCard]);

  function findUpdatedCards(boardData, nextData) {
    const updatedCards = [];


    nextData.lanes.forEach((nextLane) => {
      const prevLane = boardData.lanes.find(lane => lane.id === nextLane.id);

      if (prevLane) {
        nextLane.cards.forEach((nextCard) => {
          const prevCard = prevLane.cards.find(card => card.id === nextCard.id);

          // Kartın title veya description alanında değişiklik var mı kontrol et
          if (prevCard && (prevCard.title !== nextCard.title || prevCard.description !== nextCard.description)) {
            updatedCards.push(nextCard);
          }
        });
      }
    });

    return updatedCards;
  }



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
      } catch (error) { }
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
    ["ModalCardDetails", cardId],
    () => getByCard(cardId),
    {
      enabled: !!cardId,
    }
  );

  const reservFormik = useFormik({
    initialValues: {
      AppUserId: userId,
      Title: "",
      BoardId: BoardId,
    },
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("AppUserId", userId);
      formData.append("Title", values.Title);
      formData.append("BoardsId", BoardId);
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
      } catch (error) { }
    },
    // validationSchema: reservationScheme,
  });
  const { mutate } = useMutation(({ AppUserId, CardId }) => getCardDelete(AppUserId, CardId), {
    onSuccess: (data) => {
      queryClient.invalidateQueries(['BoardInCardList']);
    },
    onError: (error) => {
    }
  });

  const [openModal, setOpenModal] = useState()
  const HandeOpenModal = () => {
    setOpenModal(!openModal)
  }
  const CreateChecklistFormik = useFormik({
    initialValues: {
      Name: "",
      CardId: ""
    },
    onSubmit: async (values) => {
      const formData2 = new FormData();
      formData2.append("Name", values.Name);
      formData2.append("CardId", values.CardId);
      await AddChekclistMutation(formData2);
      queryClient.cancelQueries(["getAllCheklist", cardId]);
    }
  });
  const { mutate: AddChekclistMutation } = useMutation(
    (data) => CreateChecklist(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("getAllCheklist");
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );
  const { data: ChecklistData } = useQuery(["getAllCheklist", cardId], () => GetAllChecklist(cardId))
  const cardDelete = async (userId, cardId) => {
    mutate({ AppUserId: userId, CardId: cardId });
  };
  const handleCardDelete = (cardId) => {
    cardDelete(userId, cardId);
  };
  const handleOnLaneDelete = (laneId) => {
    if (eventBusRef.current) {
      eventBusRef.current.publish({ type: 'REMOVE_LANE', laneId: laneId });
    }
  }
  const handleCheckboxChange = async (data, isChecked) => {
    console.log(data);
    UpdateChecklistItemsFormik.setFieldValue("Check", isChecked);
    UpdateChecklistItemsFormik.setFieldValue("Text", data.text);
    UpdateChecklistItemsFormik.setFieldValue("DueDate", data.dueDate);
    UpdateChecklistItemsFormik.setFieldValue("Id", data.id);
    await UpdateChecklistItemsFormik.submitForm();
  };

  const [dateInput, setDateInput] = useState('');
  const [titleInput, setTitleInput] = useState('');
  const [timeInput, setTimeInput] = useState('');

  const handleCreateItem = async (id) => {
    CreateChecklistItemFormik.setFieldValue("ChecklistId", id);
    await CreateChecklistItemFormik.submitForm();
  }
  const CreateChecklistItemFormik = useFormik({
    initialValues: {
      Text: "",
    },
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("Text", values.Text);
      formData.append("ChecklistId", values.ChecklistId);
      await AddChekclistitemMutation(formData);
      queryClient.cancelQueries(["getAllCheklist", cardId]);
    }
  });
  const { mutate: AddChekclistitemMutation } = useMutation(
    (Id) => CreateChecklistitem(Id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("getAllCheklist");
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );
  const HandeUpdateCheckList = async (data) => {
    const padZero = (num) => (num < 10 ? `0${num}` : num);
    const now = new Date();
    const selectedDate = dateInput ? new Date(dateInput) : now;
    const selectedTime = timeInput ? timeInput.split(':') : [now.getHours(), now.getMinutes()];
    const dueDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), parseInt(selectedTime[0]), parseInt(selectedTime[1]));
    const formattedDueDate = `${dueDate.getFullYear()}-${padZero(dueDate.getMonth() + 1)}-${padZero(dueDate.getDate())}T${padZero(dueDate.getHours())}:${padZero(dueDate.getMinutes())}:${padZero(dueDate.getSeconds())}`;
    UpdateChecklistItemsFormik.setFieldValue("Check", data.check);
    UpdateChecklistItemsFormik.setFieldValue("Text", data.text);
    UpdateChecklistItemsFormik.setFieldValue("DueDate", formattedDueDate);
    UpdateChecklistItemsFormik.setFieldValue("Id", data.id);
    await UpdateChecklistItemsFormik.submitForm();
  };

  const HandeRemoveDateİnCheckList = async (data) => {
    UpdateChecklistItemsFormik.setFieldValue("Check", data.check);
    UpdateChecklistItemsFormik.setFieldValue("Text", data.text);
    UpdateChecklistItemsFormik.setFieldValue("DueDate", "");
    UpdateChecklistItemsFormik.setFieldValue("Id", data.id);
    await UpdateChecklistItemsFormik.submitForm();
  };
  const HandeTitleİnCheckList = async (data) => {
    UpdateChecklistItemsFormik.setFieldValue("Check", data.check);
    if (titleInput !== "" || titleInput !== null || titleInput.length > 0) {
      UpdateChecklistItemsFormik.setFieldValue("Text", titleInput);
    }
    else {
      UpdateChecklistItemsFormik.setFieldValue("Text", data.Text);
    }
    UpdateChecklistItemsFormik.setFieldValue("DueDate", data.dueDate);
    UpdateChecklistItemsFormik.setFieldValue("Id", data.id);
    await UpdateChecklistItemsFormik.submitForm();
  };

  const UpdateChecklistItemsFormik = useFormik({
    initialValues: {
      Id: "",
      Text: "",
      DueDate: "",
      Check: ""
    },
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("Id", values.Id);
      formData.append("Text", values.Text);
      formData.append("DueDate", values.DueDate);
      formData.append("Check", values.Check);
      await UpdateChecklistItem(formData);
      queryClient.invalidateQueries(["getAllCheklist", cardId]);
    }
  });
  const HandeDeleteCheklistItem = (Id) => {
    DeleteChekclistItem(Id)
  }
  const { mutate: DeleteChekclistItem } = useMutation(
    (Id) => DeleteChecklistItem(Id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("getAllCheklist");
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );
  const [state, setState] = useState({ ShowUpdateInputsChecklistItem: false, selectedIndex: 0 });
  const flexContainerRef = useRef(null);
  const HandeOpenChecklistItem = (index) => {
    setState({ ShowUpdateInputsChecklistItem: true, selectedIndex: index });
  }
  const CloseEditCheckList = () => {
    setState({ ShowUpdateInputsChecklistItem: false, selectedIndex: null });
  }
  const [ShowAddItem, setShowAddItem] = useState(false)
  const { onOpen, onClose, isOpen } = useDisclosure()
  const initRef = React.useRef()
  const { mutate: DeleteChekclist } = useMutation(
    (Id) => DeleteChecklist(Id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("getAllCheklist");
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );
  const [addItemIndex, setAddItemIndex] = useState(-1)

  //---------------------------------------------------------------


  const [isCardDateStatus, setIsCardDateStatus] = useState(thisCard?.data?.isDateStatus);
  const handleCardDateStatusCheckboxChange = (event) => {
    setIsCardDateStatus((prev) => !prev);
    sendRequest();
  };

  useEffect(() => {
    if (isSuccess && thisCard) {
      setIsCardDateStatus(thisCard.data.isDateStatus);
    }
  }, [isSuccess, thisCard]);

  const sendRequest = () => {
    axios.put(`https://localhost:7101/api/Cards/EditCardDateStatus?CardId=${cardId ? cardId : ''}`)
      .then(response => {
        // console.log('PUT request successful:', response);
      })
      .catch(error => {
        // console.error('Error making PUT request:', error);
      });
  };

  const [isStartChecked, setIsStartChecked] = useState(false);
  const [isDueChecked, setIsDueChecked] = useState(true);
  const handleStartCheckboxChange = (event) => {
    setIsStartChecked(true);
    setIsDueChecked(false);
  };

  const handleDueCheckboxChange = (event) => {
    setIsDueChecked(true);
    setIsStartChecked(false);
  };


  const [startDate, setStartDate] = useState(null);

  const handlStartDateChange = (date) => {
    setStartDate(date);
  };

  const [dueDate, setDueDate] = useState(new Date());
  const [reminderDate, setReminderDate] = useState(null);

  const defaultOption = 'None';
  const [selectedOption, setSelectedOption] = useState(defaultOption);

  const handleDueDateChange = (date) => {
    setDueDate(date);
    calculateReminderDate(selectedOption);
  };

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    calculateReminderDate(event.target.value);
  };

  useEffect(() => {
    calculateReminderDate(selectedOption);
  }, [dueDate, selectedOption]);

  const calculateReminderDate = (option) => {
    let reminderTime = 0;
    switch (option) {
      case 'option1':
        reminderTime = 0;
        break;
      case 'option2':
        reminderTime = 5;
        break;
      case 'option3':
        reminderTime = 10;
        break;
      case 'option4':
        reminderTime = 15;
        break;
      case 'option5':
        reminderTime = 60;
        break;
      case 'option6':
        reminderTime = 120;
        break;
      case 'option7':
        reminderTime = 1440;
        break;
      case 'option8':
        reminderTime = 2880;
        break;
      default:
        reminderTime = 0;
    }
    const millisecondsInMinute = 60000;
    const newReminderDate = new Date(dueDate.getTime() - reminderTime * millisecondsInMinute);
    setReminderDate(newReminderDate);
  };

  const cardAddDateFormik = useFormik({
    initialValues: {
      CardId: cardId ? cardId : '',
      StartDate: startDate ? startDate : '',
      EndDate: dueDate ? dueDate : '',
      Reminder: reminderDate ? reminderDate : '',
    },
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("CardId", cardId ? cardId : '');
      formData.append("StartDate", startDate ? startDate.toISOString() : '');
      formData.append("EndDate", dueDate ? dueDate.toISOString() : '');
      formData.append("Reminder", reminderDate ? reminderDate.toISOString() : '');
      try {
        const response = await axios.put(
          "https://localhost:7101/api/Cards/UpdateCard",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.status === 201) {
          // queryClient.invalidateQueries(["BoardInCardList"]);
        }
      } catch (error) { }
    },
    // validationSchema: reservationScheme,
  });
  const formatDate = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";

    const options = { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  console.log("---<>", thisCard?.data);

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
          onCardDelete={handleCardDelete}
          onLaneDelete={handleOnLaneDelete}
        >
        </Board>
        <div style={{ margin: "10px" }} className={Styles.createCardList}>
          <form onSubmit={reservFormik.handleSubmit}>
            <FormControl>
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
              <Button onClick={reservFormik.handleSubmit} className={Styles.createcardlistbtn} type="submit">
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
        {thisCard ? (
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
                {thisCard?.data?.endDate !== null &&
                  <div className={Styles.DueDates}>
                    <span>Due Date</span>
                    <div>
                      <div>
                        <input type="checkbox"
                          checked={isCardDateStatus === true ? true : false}
                          onChange={handleCardDateStatusCheckboxChange} />
                      </div>
                      <div>
                        <button onClick={() => setCardDateModalShow((prev) => !prev)}>{formatDate(thisCard?.data?.endDate)}
                          <span style={{ display: thisCard?.data?.dateColor !== "red" ? '' : 'none', backgroundColor: isCardDateStatus === true && '#1f845a' }}>
                            {isCardDateStatus ? 'Complate' : 'Overdue'}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                }
                <ChakraProvider>
                  {ChecklistData?.map((Data, Index) => {
                    return (
                      <div key={Index} className={Styles.ChecklistMain}>
                        <p>{Data.name}</p>
                        <div className={Styles.ChecklistMainConatiner}>
                          <div >
                            <FontAwesomeIcon icon={faSquareCheck} />
                          </div>
                          <div className={Styles.ChecHeader}>
                            <p editable={"true"}>{Data.name}</p>
                            <button onClick={() => DeleteChekclist(Data.id)}>Delete</button>
                          </div>
                        </div>
                        <Flex pt={3} gap={5} alignItems={'center'}>
                          <Text fontSize={14} m={0}>{Data?.checkPercentage}%</Text>
                          <Progress borderRadius={5} h={2} w={'100%'} value={Data?.checkPercentage} />
                        </Flex>
                        <Flex alignItems={'center'} w={"100%"} gap={1} justifyContent={'center'} flexDirection={'column'}>
                          {Data?.getCheckitemDtos?.map((data, index) => (
                            <>

                              <Flex pl={3} w={"100%"} gap={3} alignItems={'center'} key={index}>
                                {state.selectedIndex === data.id && state.ShowUpdateInputsChecklistItem === true ?
                                  <>
                                    <Flex backgroundColor={"#A1BDD914"} padding={3} borderRadius={14} gap={2} flexDir={'column'} w={"100%"}>
                                      <Input
                                        backgroundColor={"#22272B"}
                                        border={'#579DFF 1px solid'}
                                        w={"100%"}
                                        defaultValue={data.text}
                                        color={'white'}
                                        onChange={(e) => {
                                          const newValue = e.target.value.trim();
                                          setTitleInput(newValue !== "" ? newValue : data.text);
                                        }}
                                        name="Text"
                                      />
                                      <Flex justifyContent={'space-between'} alignItems={'center'}>
                                        <Flex gap={2} alignItems={'center'}>
                                          <button onClick={() => { HandeTitleİnCheckList(data); CloseEditCheckList() }} style={{ backgroundColor: "#579DFF", color: "#1D2125", fontSize: "14px", fontWeight: "600" }}>Save</button>
                                          <button style={{ backgroundColor: "rgb(231 240 249 / 8%)", color: "#acb6c1;", fontSize: "14px", fontWeight: "600" }} onClick={() => CloseEditCheckList()}>Close</button>
                                        </Flex>
                                        <Flex gap={10} alignItems={'center'}>
                                          <Popover closeOnBlur={false} placement='left' initialFocusRef={initRef}>
                                            {({ isOpen, onClose }) => (
                                              <>
                                                <PopoverTrigger>
                                                  <Button className={Styles.MenuButton}>
                                                    <Flex gap={2} alignItems={'center'}>
                                                      {data.dueDate > "2000" ?
                                                        <>
                                                          <FontAwesomeIcon style={{ marginBottom: "2px" }} fontSize={"14px"} icon={faClock} />
                                                          <p style={{ margin: "0" }}>{new Date(data.dueDate).toLocaleString('en-US', { year: "numeric", month: 'short', day: '2-digit', hour: 'numeric', minute: 'numeric' })}</p>
                                                        </>
                                                        :
                                                        <>
                                                          <Flex gap={2} alignItems={'center'}>
                                                            <FontAwesomeIcon fontSize={"14px"} icon={faClock} />
                                                            <p style={{ margin: "0" }}> Set due Date</p>
                                                          </Flex>
                                                        </>
                                                      }
                                                    </Flex>
                                                  </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className={Styles.PopoverMain} border={"#3a3d41 1px solid"} backgroundColor={"#1D2125"}>
                                                  <Flex alignItems={"center"}>
                                                    <PopoverHeader border={"none"}>Change due date</PopoverHeader>
                                                    <PopoverCloseButton style={{ marginTop: "2px", backgroundColor: "transparent" }} />
                                                  </Flex>
                                                  <PopoverBody border={"none"}>
                                                    <Flex gap={2} alignItems={'center'}>
                                                      <Input
                                                        id="timeInput"
                                                        onChange={(e) => setDateInput(e.target.value)}
                                                        defaultValue={data.dueDate && new Date(data.dueDate).getFullYear() < 2000 ?
                                                          new Date().toISOString().split('T')[0] :
                                                          (data.dueDate ? data.dueDate.split('T')[0] : '')}
                                                        className={Styles.DateInput}
                                                        type="date"
                                                      />
                                                      <Input
                                                        onChange={(e) => setTimeInput(e.target.value)}
                                                        defaultValue={
                                                          data.dueDate && new Date(data.dueDate).getFullYear() < 2000 ?
                                                            "12:00" :
                                                            (data.dueDate ? (data.dueDate.split('T')[1] ? data.dueDate.split('T')[1].split(':')[0] + ':' + data.dueDate.split('T')[1].split(':')[1] : '') : '')
                                                        }
                                                        className={Styles.DateInput}
                                                        type="time"
                                                      />
                                                    </Flex>
                                                  </PopoverBody>
                                                  <PopoverFooter border={"none"}>
                                                    <Flex gap={2} >
                                                      <button onClick={() => { HandeUpdateCheckList(data); onClose() }} style={{ backgroundColor: "#579DFF", color: "#1D2125", fontSize: "14px", fontWeight: "600" }}>Save</button>
                                                      <button onClick={() => { HandeRemoveDateİnCheckList(data); onClose() }}>Remove</button>
                                                    </Flex>
                                                  </PopoverFooter>
                                                </PopoverContent>
                                              </>
                                            )}
                                          </Popover>
                                          <Menu>
                                            <MenuButton className={Styles.MenuButton} as={Button} >
                                              <FontAwesomeIcon icon={faEllipsis} />
                                            </MenuButton>
                                            <MenuList w={"100%"} backgroundColor={"#22272B"} border={'none'}>
                                              <MenuItem onClick={() => { HandeDeleteCheklistItem(data.id); CloseEditCheckList() }} mt={"5px !important"} w={"100% !important"}>
                                                <Flex gap={2} alignItems={'center'}>
                                                  <FontAwesomeIcon fontSize={"14px"} icon={faTrash} />
                                                  <p style={{ margin: "0", padding: '0' }}>Delete</p>
                                                </Flex>
                                              </MenuItem>
                                            </MenuList>
                                          </Menu>
                                        </Flex>
                                      </Flex>
                                    </Flex>
                                  </>
                                  :
                                  <>
                                    <Checkbox mb={1} checked={data.check} isChecked={data.check} onChange={(e) => handleCheckboxChange(data, e.target.checked)} />
                                    <Text userSelect={'none'} borderRadius={10} cursor={'pointer'} w={"100%"} p={"6px 12px"} _hover={{ background: "var(--ds-background-neutral, #A1BDD914)" }}
                                      onClick={() => HandeOpenChecklistItem(data.id)} m={0}>{data.text}</Text>
                                  </>
                                }
                              </Flex>

                            </>
                          ))}
                        </Flex>
                        {!ShowAddItem &&
                          <button onClick={() => { setShowAddItem(!ShowAddItem); setAddItemIndex(Index) }} style={{ margin: '20px 10px' }}>Add an item</button>
                        }
                        {ShowAddItem && addItemIndex === Index &&
                          <Flex padding={2} borderRadius={14} gap={2} flexDir={'column'} w={"100%"}>
                            <Input
                              backgroundColor={"#22272B"}
                              border={'#579DFF 1px solid'}
                              w={"100%"}
                              color={'white'}
                              placeholder="Add an Item"
                              onChange={CreateChecklistItemFormik.handleChange}
                              name="Text"
                            />
                            <Flex justifyContent={'space-between'} alignItems={'center'}>
                              <Flex gap={2} alignItems={'center'}>
                                <button onClick={() => { CloseEditCheckList(); handleCreateItem(Data.id) }} style={{ backgroundColor: "#579DFF", color: "#1D2125", fontSize: "14px", fontWeight: "600" }}>Add</button>
                                <button style={{ backgroundColor: "rgb(231 240 249 / 8%)", color: "#acb6c1;", fontSize: "14px", fontWeight: "600" }} onClick={() => { setShowAddItem(!ShowAddItem) }}>Cancel</button>
                              </Flex>
                            </Flex>
                          </Flex>
                        }
                      </div>
                    )
                  })}
                </ChakraProvider>
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
                      {/* <Form.Group
                        className="my-3"
                        controlId="create-workspace-desc"
                      >
                        <Form.Control as="textarea" rows={3} cols={80} />
                      </Form.Group> */}
                      <TextEditor description={thisCard?.data.description} />
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
                      <button onClick={HandeOpenModal} className="btn btn-primary default-submit mb-2 w-100 text-start">
                        <FontAwesomeIcon
                          className="me-2"
                          icon={faSquareCheck}
                        />
                        Checklist
                      </button>
                      {openModal &&
                        <div className={Styles.ChecklistModal}>
                          <div >
                            <h1 className={Styles.CheckListHeader}>Add checklist<FontAwesomeIcon onClick={HandeOpenModal} className={Styles.XmarkIcon} icon={faXmark} /></h1>
                          </div>
                          <label htmlFor="Name">Title</label>
                          <input onChange={CreateChecklistFormik.handleChange} className={Styles.InputCheck} name="Name" type="text" />
                          <button
                            type="submit"
                            onClick={() => {
                              CreateChecklistFormik.handleSubmit();
                              CreateChecklistFormik.setFieldValue("CardId", thisCard?.data.id);
                            }}
                          >
                            Add
                          </button>
                        </div>
                      }
                      <button onClick={() => setCardDateModalShow((prev) => !prev)} className="btn btn-primary default-submit mb-2 w-100 text-start">
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
                      <button onClick={(pres) => setMoveModalShow(true)} className="btn btn-primary default-submit mb-2 w-100 text-start">
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
          </Modal.Body >
        ) : (
          ""
        )}
      </Modal >

      <Modal
        show={moveModalShow}
        onHide={() => {
          setMoveModalShow(false);
        }}
        fullscreen="md-down"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        id={Styles.MainMoveModelShow}
      >
        <Modal.Body
          id={Styles.MoveModelShow}
        >
          <div className={Styles.PositionMoveModelShow}>
            <div className={Styles.headerMoveModelShow}>
              <div></div>
              <div>Move Card</div>
              <div><button>X</button></div>
            </div>
            <div className={Styles.centerMoveModelShow}>
              <div>
                <Dropdown id={Styles.DropDownMove} data-bs-theme="dark">
                  <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                    Dropdown Button
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1" active>
                      Action
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item href="#/action-4">Separated link</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <div>
                <Dropdown data-bs-theme="dark">
                  <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                    Dropdown Button
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1" active>
                      Action
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item href="#/action-4">Separated link</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <div>
                <Button variant="primary">Move</Button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={cardDateModalShow}
        className={Styles.DateCardModal}
        onHide={() => {
          setCardDateModalShow(false);
        }}
        fullscreen="md-down"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        style={{ width: '370px' }}
        id={Styles.MainMoveModelShow}
      >
        <Modal.Body
          style={{
            backgroundColor: '#1d2125',
            width: '370px'
          }}
          id={Styles.MoveModelShow}
        >
          <div className={`date-picker open`}>
            <div style={{ width: '350px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '50px', backgroundColor: '#1d2125', position: 'fixed', zIndex: 10 }}>
              <div></div>
              <h1 style={{ fontSize: '24px', fontFamily: 'initial', color: 'white', display: 'flex', justifyContent: 'center' }}>
                Dates
              </h1>
              <button onClick={() => setCardDateModalShow((pres) => !pres)} style={{ color: 'white', fontSize: '20px', marginRight: '5px' }}><FontAwesomeIcon icon={faX} /></button>
            </div>

            <div id={Styles.CardAddDate}>
              <div className="input" style={{ marginTop: '30px' }}>
                <button><i className="zmdi zmdi-calendar"></i></button>
              </div>
              <div style={{ width: '100%', height: 'auto', display: 'flex', justifyContent: 'center' }}>
                <div style={{ display: isStartChecked ? 'block' : 'none', }}>
                  {true && (
                    <DatePicker
                      color={"red"}
                      backgroundColor={"red"}
                      selected={startDate}
                      onChange={handlStartDateChange}
                      dateFormat="dd/MM/yyyy"
                      inline
                      selectsStart
                      startDate={startDate}
                      endDate={dueDate}
                    />
                  )}
                </div>
                <div style={{ display: isDueChecked ? 'block' : 'none' }}>
                  {true && (
                    <DatePicker
                      backgroundColor="blue"
                      selected={dueDate}
                      onChange={handleDueDateChange}
                      inline
                      dateFormat="dd/MM/yyyy h:mm aa"
                      showTimeInput
                      timeInputLabel="Hour:"
                      timeFormat="h:mm aa"
                      timeIntervals={15}
                      timeCaption="Time"
                      selectsEnd
                      startDate={startDate}
                      endDate={dueDate}
                      minDate={startDate}
                    />
                  )}
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', }}>
                  <label>Start Date</label>
                  <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center', marginTop: '5px' }}>
                    <input
                      style={{ border: 'none', border: 'none', color: '#0c66e4', backgroundColor: '#0c66e4', width: '38px', height: '38px', }}
                      type="checkbox"
                      checked={isStartChecked}
                      onChange={handleStartCheckboxChange}
                    />
                    <div className={Styles.result}><span style={{ display: startDate ? 'block' : 'none' }}>{startDate ? startDate.toLocaleDateString() : ''}</span></div>
                  </div>
                </div>
              </div>
              <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', }}>
                  <label>Due Date</label>
                  <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center', marginTop: '5px' }}>
                    <input
                      style={{ border: 'none', border: 'none', color: '#0c66e4', backgroundColor: '#0c66e4', width: '38px', height: '38px', }}
                      type="checkbox"
                      checked={isDueChecked}
                      onChange={handleDueCheckboxChange}
                    />
                    <div className={Styles.result}><span style={{ display: dueDate ? '' : 'none' }}>{dueDate ? dueDate.toLocaleDateString() : ''}</span> <span style={{ display: dueDate ? '' : 'none' }}>{dueDate && dueDate.toLocaleTimeString()}</span></div>
                  </div>
                </div>
              </div>
              <div style={{ marginTop: '20px' }}>
                <ChakraProvider>
                  <span style={{ color: 'white', fontWeight: '500' }}>Set due date reminder</span>
                  <Select id={Styles.SelectbeforeInfo} borderColor={'#0c66e4'} height={'50px'} width={"98%"} color={'white'} backgroundColor={'#22272B'} value={selectedOption} onChange={handleChange}>
                    <option style={{ backgroundColor: '#22272B' }} value={defaultOption}>{defaultOption}</option>
                    <option style={{ backgroundColor: '#22272B' }} value="option1">At time of due date</option>
                    <option style={{ backgroundColor: '#22272B' }} value="option2">5 Minutes before</option>
                    <option style={{ backgroundColor: '#22272B' }} value="option3">10 Minutes before</option>
                    <option style={{ backgroundColor: '#22272B' }} value="option4">15 Minutes before</option>
                    <option style={{ backgroundColor: '#22272B' }} value="option5">1 Hour before</option>
                    <option style={{ backgroundColor: '#22272B' }} value="option6">2 Hours before</option>
                    <option style={{ backgroundColor: '#22272B' }} value="option7">1 Day before</option>
                    <option style={{ backgroundColor: '#22272B' }} value="option8">2 Days before</option>
                  </Select>
                </ChakraProvider>
                <Col style={{ color: 'white', marginTop: '10px', fontSize: '18px' }}>Reminders will be sent to all members and watchers of this card.</Col>
                <Col style={{ marginTop: '15px' }}>
                  <Button onClick={() => cardAddDateFormik.handleSubmit()} style={{ width: '98%' }}>Save</Button>
                  <Button style={{ width: '98%', marginTop: '20px', backgroundColor: '#1d2125' }}>Remove</Button>
                </Col>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

    </div >
  );
};

export default CardList;
