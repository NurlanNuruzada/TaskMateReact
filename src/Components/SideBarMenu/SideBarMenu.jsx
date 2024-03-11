import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Styles from './SideBarMenu.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faUserGroup, faBriefcase, faCheck, faGlobe } from '@fortawesome/free-solid-svg-icons';

export default function SideBarMenu() {
  return (
    <>
      <div className={Styles.sideBarMenuWrapper}>
        <Col className={Styles.sideBarMenu} lg={2}>
          <Container className={Styles.sideBarMenuWorkspaceName} fluid>
            <Image className={Styles.workspacePic} src="https://placehold.co/512x512/CDD3FF/1d2125?text=T" rounded />
            <div className='ms-2'>
              <p className='m-0 fw-bold'>Trello Workspace</p>
              <p className='m-0 small'>Free</p>
            </div>
          </Container>
        </Col>
        <Col lg={10} className={Styles.sideBarMenuTopMenuWrapper}>
          <Container fluid className={Styles.sideBarMenuTopMenu}>
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
        </Container>
      </Col>
    </div >
    </>

  );
}