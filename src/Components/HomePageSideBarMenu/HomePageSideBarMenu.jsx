import React, { useState, useEffect } from 'react'
import Image from 'react-bootstrap/Image';
import Accordion from 'react-bootstrap/Accordion';
import Col from 'react-bootstrap/Col';
import Styles from './HomePageSideBarMenu.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserGroup, faBarsProgress, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import CustomModal from '../CustomModal/CustomModal';
import { GetAllWorkspaces } from '../../Service/WorkSpaceService';
import { useMutation } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import jwtDecode from 'jwt-decode';
import {  setData } from '../../Redux/Slices/WorkspaceAndBorderSlice';

export default function SideBarMenu() {
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  const [Workspaces, setWorkspaces] = useState();
  const { token } = useSelector((x) => x.auth);
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
  useEffect(() => {
    GetUsersAllWorkSpaces(userId);
  }, [userId]);
  const updateParentState = (modalShow) => {
    setModalShow(modalShow);
  };
  return (
    <>
      <Col className={[Styles.sideBarMenuWrapper, "col-2"]}>
        <Col className={Styles.sideBarMenu}>
          <Accordion className='m-auto col-11 mt-2' defaultActiveKey="0">
            <h5 className='fw-bold my-3'>Workspaces</h5>
            {Workspaces?.map((data, index) => {
              return (
                <Accordion.Item key={index} className={Styles.accordionBtn} eventKey={index.toString()}>
                  <Accordion.Header>
                    <Image className={[Styles.sideBarMenuWorkspacePic, 'me-2']} src="https://placehold.co/512x512/d9e3da/1d2125?text=S" rounded />
                    {data.title}
                  </Accordion.Header>
                  <Accordion.Body className='d-flex flex-column p-0 mt-2'>
                    <Button onClick={()=>dispatch(setData({ workspaceId: data.id }))} className='fw-bold w-100 text-start ps-4'><span className='me-3 text-center'><FontAwesomeIcon icon={faBarsProgress} /></span>Boards</Button>
                    <Button className='fw-bold my-2 w-100 text-start ps-4'><span className='me-3 text-center'><FontAwesomeIcon icon={faUserGroup} /></span>Members</Button>
                    <Button onClick={() => setModalShow(true)} className='fw-bold w-100 text-start ps-4'><span className='me-3 text-center'><FontAwesomeIcon icon={faTrashCan} /></span>Delete</Button>
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
    </>
  );
}