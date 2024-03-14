import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Styles from './SideBarMenu.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

export default function SideBarMenu() {
  const [isMenuOpen, setMenuOpen] = useState(true)
  return (
    <>
      <Col className={[Styles.sideBarMenuWrapper, (isMenuOpen ? "col-2" : '')]}>
        {isMenuOpen ? <Col className={[Styles.sideBarMenu, , (isMenuOpen ? "col-lg-12" : '')]}>
          <div>
            <Container className={[Styles.sideBarMenuWorkspaceName, "justify-content-between px-3 align-items-center"]} fluid>
              <span className='d-flex align-items-center'>
                <Image className={Styles.workspacePic} src="https://placehold.co/512x512/CDD3FF/1d2125?text=T" rounded />
                <p className='m-0 ms-2 fw-bold'>Trello Workspace</p>
              </span>
              <button onClick={() => setMenuOpen(false)} className={"btn btn-primary default-submit"}><FontAwesomeIcon icon={faChevronLeft} /></button>
            </Container>
            <Container className={[Styles.sideBarMenuWorkspace, "mt-2"]} fluid>
              <div className='ms-2'>
                <p className='m-0 fw-bold'>Trello Workspace</p>
                <p className='m-0 small'>Free</p>
              </div>
            </Container>
          </div>
        </Col> : <Col className={Styles.sideBarMenu}>
          <button onClick={() => setMenuOpen(true)} class="btn btn-primary default-submit m-2 mt-4"><FontAwesomeIcon icon={faChevronRight} /></button>
        </Col>}
      </Col >
    </>

  );
}