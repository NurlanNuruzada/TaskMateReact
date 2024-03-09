import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Header() {
  return (
    <Navbar className='navbar-custom' bg='dark' text expand="lg" >
      <Container fluid>
        <Navbar.Brand className='d-flex align-items-center' style={{ color: 'white' }} href="/"><svg className='me-2' width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M4 5C4 4.44772 4.44772 4 5 4H7C7.55228 4 8 4.44772 8 5V7C8 7.55228 7.55228 8 7 8H5C4.44772 8 4 7.55228 4 7V5ZM4 11C4 10.4477 4.44772 10 5 10H7C7.55228 10 8 10.4477 8 11V13C8 13.5523 7.55228 14 7 14H5C4.44772 14 4 13.5523 4 13V11ZM11 4C10.4477 4 10 4.44772 10 5V7C10 7.55228 10.4477 8 11 8H13C13.5523 8 14 7.55228 14 7V5C14 4.44772 13.5523 4 13 4H11ZM10 11C10 10.4477 10.4477 10 11 10H13C13.5523 10 14 10.4477 14 11V13C14 13.5523 13.5523 14 13 14H11C10.4477 14 10 13.5523 10 13V11ZM17 4C16.4477 4 16 4.44772 16 5V7C16 7.55228 16.4477 8 17 8H19C19.5523 8 20 7.55228 20 7V5C20 4.44772 19.5523 4 19 4H17ZM16 11C16 10.4477 16.4477 10 17 10H19C19.5523 10 20 10.4477 20 11V13C20 13.5523 19.5523 14 19 14H17C16.4477 14 16 13.5523 16 13V11ZM5 16C4.44772 16 4 16.4477 4 17V19C4 19.5523 4.44772 20 5 20H7C7.55228 20 8 19.5523 8 19V17C8 16.4477 7.55228 16 7 16H5ZM10 17C10 16.4477 10.4477 16 11 16H13C13.5523 16 14 16.4477 14 17V19C14 19.5523 13.5523 20 13 20H11C10.4477 20 10 19.5523 10 19V17ZM17 16C16.4477 16 16 16.4477 16 17V19C16 19.5523 16.4477 20 17 20H19C19.5523 20 20 19.5523 20 19V17C20 16.4477 19.5523 16 19 16H17Z" fill="currentColor"></path></svg> TaskMate</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <NavDropdown className='navbar-workspaces' title="Workspaces" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">
                <Card.Subtitle className='my-2 container-fluid'> Your Workspaces </Card.Subtitle> 
                <div className='container-fluid navbar-workspace-link'>
                  <Row className='px-1 py-3 d-flex align-items-center'>
                    <Col xl={3}>
                      <Image className='workspace-pic' src="https://igvofficial.com/wp-content/uploads/2023/09/369992905_655289193002976_6442625660937886754_n.jpg" rounded />
                    </Col>
                    <Col xl={6} className='p-0'>
                      Jhonny's Workspace
                    </Col>
                  </Row>
                </div>
              </NavDropdown.Item>
              <NavDropdown.Item href="#action3">
                <div className='container-fluid navbar-workspace-link'>
                  <Row className='px-1 py-3 d-flex align-items-center'>
                    <Col xl={3}>
                      <Image className='workspace-pic' src="https://placehold.co/512x512/CDD3FF/1d2125?text=T" rounded />
                    </Col>
                    <Col xl={6} className='p-0'>
                      Trello Workspace
                    </Col>
                  </Row>
                </div>
              </NavDropdown.Item>
            </NavDropdown>
            <DropdownButton className='custom-dropdown ms-3' id="dropdown-basic-button" title="Create">
              <Dropdown.Item className='p-0' href="#/action-1">
                <Card
                  bg={'dark'}
                  text={'white'}
                  style={{ width: '20rem', border: 'none', textWrap: "wrap" }}
                  className="mb-2"
                >
                  <div className='container-fluid'>
                    <Card.Body className='create-button-option'>
                      <Card.Subtitle> Create Board </Card.Subtitle>
                      <Card.Text>
                        Some quick example text to build on the card title and make up the
                        bulk of the card's content.
                      </Card.Text>
                    </Card.Body>
                  </div>
                </Card>
              </Dropdown.Item>
              <Dropdown.Item className='p-0' href="#/action-2">
                <Card
                  bg={'dark'}
                  text={'white'}
                  style={{ width: '20rem', border: 'none', textWrap: "wrap" }}
                  className="mb-2"
                >
                  <div className='container-fluid'>
                    <Card.Body className='create-button-option'>
                      <Card.Subtitle> Create Workspace </Card.Subtitle>
                      <Card.Text>
                        Some quick example text to build on the card title and make up the
                        bulk of the card's content.
                      </Card.Text>
                    </Card.Body>
                  </div>
                </Card>
              </Dropdown.Item>
            </DropdownButton>
          </Nav>
          <Form className="d-flex input-custom">
            <Form.Control
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </Form>
          <Row className='ms-1 d-flex align-items-center'>
            <Col>
              <Button className='custom-notification'> <FontAwesomeIcon icon={faBell} style={{ color: "#cacaca", transform: 'rotate(45deg)' }} />  </Button>
            </Col>
            <Col>
              <Image className='profile-pic' src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQcBR70-dRGg6OCJSvZ2xUzxQRN9F97n2CX2iekuDPjThLQQkt6" roundedCircle />
            </Col>
          </Row>
        </Navbar.Collapse>
      </Container>
    </Navbar >
  );
}