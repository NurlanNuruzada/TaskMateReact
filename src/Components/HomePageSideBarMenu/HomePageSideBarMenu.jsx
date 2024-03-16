import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Accordion from 'react-bootstrap/Accordion';
import Col from 'react-bootstrap/Col';
import Styles from './HomePageSideBarMenu.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserGroup, faBarsProgress } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';

export default function SideBarMenu() {
  return (
    <>
      <Col className={[Styles.sideBarMenuWrapper, "col-2"]}>
        <Col className={Styles.sideBarMenu}>
          <Accordion className='m-auto col-11 mt-2' defaultActiveKey="0">
            <h5 className='fw-bold my-3'>Workspaces</h5>
            <Accordion.Item className={Styles.accordionBtn} eventKey="0">
              <Accordion.Header>
                <Image className={[Styles.sideBarMenuWorkspacePic, 'me-2']} src="https://placehold.co/512x512/d9e3da/1d2125?text=S" rounded />
                Sanan's Workspace
              </Accordion.Header>
              <Accordion.Body className='d-flex flex-column p-0 mt-2'>
                <Button className='fw-bold mb-2 w-100 text-start ps-4'><span className='me-3 text-center'><FontAwesomeIcon icon={faBarsProgress} /></span>Boards</Button>
                <Button className='fw-bold w-100 text-start ps-4'><span className='me-3 text-center'><FontAwesomeIcon icon={faUserGroup} /></span>Members</Button>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item className={[Styles.accordionBtn, 'mt-2']} eventKey="1">
              <Accordion.Header>
                <Image className={[Styles.sideBarMenuWorkspacePic, 'me-2']} src="https://placehold.co/512x512/CDD3FF/1d2125?text=T" rounded />
                Trello Workspace
              </Accordion.Header>
              <Accordion.Body className='d-flex flex-column p-0 mt-2'>
                <Button className='fw-bold mb-2 w-100 text-start ps-4'><span className='me-3 text-center'><FontAwesomeIcon icon={faBarsProgress} /></span>Boards</Button>
                <Button className='fw-bold w-100 text-start ps-4'><span className='me-3 text-center'><FontAwesomeIcon icon={faUserGroup} /></span>Members</Button>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Col >
    </>

  );
}