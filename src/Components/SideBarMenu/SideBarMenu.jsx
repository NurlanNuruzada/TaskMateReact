import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Styles from './SideBarMenu.module.css'

export default function SideBarMenu() {
  return (
    <>
      <Col  className={Styles.sideBarMenuWrapper}>
        <Col className={Styles.sideBarMenu} lg={12}>
          <Container className={Styles.sideBarMenuWorkspaceName} fluid>
            <Image className={Styles.workspacePic} src="https://placehold.co/512x512/CDD3FF/1d2125?text=T" rounded />
            <div className='ms-2'>
              <p className='m-0 fw-bold'>Trello Workspace</p>
              <p className='m-0 small'>Free</p>
            </div>
          </Container>
        </Col>
      </Col >
    </>

  );
}