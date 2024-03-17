import React, { useState, useEffect } from 'react'
import Image from 'react-bootstrap/Image';
import Accordion from 'react-bootstrap/Accordion';
import Col from 'react-bootstrap/Col';
import Styles from './HomePageSideBarMenu.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserGroup, faBarsProgress, faTrashCan, faEdit } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import CustomModal from '../CustomModal/CustomModal';
import { DeleteWorkSpace, GetAllWorkspaces, UpdateWorkSpace } from '../../Service/WorkSpaceService';
import { useMutation, useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { incrementRefresh, setData } from '../../Redux/Slices/WorkspaceAndBorderSlice';
import { AlertIcon, FormLabel, Stack, useDisclosure, Alert } from '@chakra-ui/react';
import { ChakraProvider } from '@chakra-ui/react';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  FormControl
} from '@chakra-ui/react'
import { Formik, useFormik } from 'formik';
import { ChakraAlert } from '@chakra-ui/react';
import { GetUserById } from '../../Service/UserService';

export default function SideBarMenu() {
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [answer, setAnswer] = useState(false);
  const [Workspaces, setWorkspaces] = useState();
  const [WorkspaceId, setWorkspaceId] = useState();
  const { token } = useSelector((x) => x.auth);
  const { refresh, workspaceId } = useSelector((x) => x.Data)

  useEffect(() => {
    setWorkspaceId(workspaceId)
  }, [workspaceId])
  const decodedToken = token ? jwtDecode(token) : null;
  const userId = decodedToken
    ? decodedToken[
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
    ]
    : null;
  const { mutate: GetUsersAllWorkSpaces } = useMutation(
    (userId) => GetAllWorkspaces(userId),
    {
      onSuccess: (values) => {
        setWorkspaces(values.data);
      },
      onError: (err) => { },
    }
  );
  const { data: Data } = useQuery(["BoardInCardList", userId], () =>
    GetUserById(userId)
  );
  const { mutate: DeleteWorks } = useMutation(
    (userId) => DeleteWorkSpace(userId, workspaceId),
    {
      onSuccess: (values) => {
        GetUsersAllWorkSpaces(userId);
        setShowAlert(true);
        const timer = setTimeout(() => {
          setShowAlert(false);
        }, 2000);
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );
  const UpdateWorksapceFomik = useFormik({
    initialValues: {
      title: "",
      description: "",
      workspaceId: workspaceId,
      appUserId: userId
    },
    onSubmit: async (values) => {
      values.workspaceId = WorkspaceId;
      await Update(values);
      onClose()
      dispatch(incrementRefresh());
    },
  });

  const { mutate: Update } = useMutation(
    (data) => UpdateWorkSpace(data),
    {
      onSuccess: (values) => {
        console.log(values);
        GetUsersAllWorkSpaces(userId);
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );
  useEffect(() => {
    if (answer) {
      DeleteWorks(userId, workspaceId)
      setAnswer(false)
    }
  }, [answer]);
  useEffect(() => {
    GetUsersAllWorkSpaces(userId);
  }, [userId, refresh]);
  const [Render, SetRender] = useState(refresh)
  useEffect(() => {
    SetRender(refresh);
  }, [refresh]);
  useEffect(() => {
    GetUsersAllWorkSpaces(userId);
  }, [Render]);

  const updateParentState = (modalShow, Answer) => {
    setModalShow(modalShow);
    setAnswer(Answer);
  };
  const HandeUpdateClick = (data) => {
    onOpen()
    dispatch(setData({ workspaceId: data }))
  }
  const [showAlert, setShowAlert] = useState(false);
  const [ShowCreateError, setShowCreateError] = useState(false);
  return (
    <>
      <ChakraProvider>
        <Stack top={0} right={0} position={'absolute'} spacing={3}>
          {showAlert && (
            <Alert status='success' variant='top-accent'>
              <AlertIcon />
              Workspace is Succesfully Deleted!
            </Alert>
          )}
          {ShowCreateError && (
            <Alert status='error' variant='top-accent'>
              <AlertIcon />
              Workspace couldn't be created!
            </Alert>
          )}
        </Stack>
      </ChakraProvider>
      <Col className={[Styles.sideBarMenuWrapper, "col-2"]}>
        <Col className={Styles.sideBarMenu}>
          <Accordion className='m-auto col-11 mt-2' defaultActiveKey="0">
            <h5 className='fw-bold my-3'>Workspaces</h5>
            {Workspaces?.map((data, index) => {
              return (
                <Accordion.Item onClick={() => dispatch(setData({ workspaceId: data.id }))} key={index} className={Styles.accordionBtn} eventKey={index.toString()}>
                  <Accordion.Header>
                    <Image className={[Styles.sideBarMenuWorkspacePic, 'me-2']} src={`https://placehold.co/512x512/d9e3da/1d2125?text=${data.title.slice(
                      0,
                      1
                    )}`} rounded />
                    {data.title}
                  </Accordion.Header>
                  <Accordion.Body className='d-flex flex-column p-0 mt-2'>
                    <Button className='fw-bold w-100 text-start ps-4'><span className='me-3 text-center'><FontAwesomeIcon icon={faBarsProgress} /></span>Boards</Button>
                    <Button className='fw-bold my-2 w-100 text-start ps-4'><span className='me-3 text-center'><FontAwesomeIcon icon={faUserGroup} /></span>Members</Button>
                    {Data?.data?.role === "GlobalAdmin" || Data?.data?.role === "Admin" ? (
                      <>
                        <Button onClick={() => setModalShow(true)} className='fw-bold w-100 text-start ps-4'><span className='me-3 text-center'><FontAwesomeIcon icon={faTrashCan} /></span>Delete</Button>
                        <Button onClick={() => HandeUpdateClick(data.id)} className='fw-bold w-100 text-start ps-4'><span className='me-3 text-center'><FontAwesomeIcon icon={faEdit} /></span>Edit</Button>
                      </>
                    ) : null}
                  </Accordion.Body>
                </Accordion.Item>
              );
            })}
          </Accordion>
        </Col>
      </Col >
      <CustomModal
        type={'delete'}
        object={'workspace'}
        message={`Are you sure you want to delete this ${"text"} workspace?`}
        title={'Delete Workspace'}
        show={modalShow}
        updateParentState={updateParentState}
      />

      <ChakraProvider>
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create your account</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel >Title</FormLabel>
                <Input name='title' onChange={UpdateWorksapceFomik.handleChange} ref={initialRef} placeholder='Title' />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>description</FormLabel>
                <Input name='description' onChange={UpdateWorksapceFomik.handleChange} placeholder='Description' />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button type='submit' onClick={UpdateWorksapceFomik.handleSubmit} colorScheme='blue' mr={3}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

      </ChakraProvider>


    </>
  );
}