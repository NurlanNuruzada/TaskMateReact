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
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Collapse from 'react-bootstrap/Collapse';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faBarsProgress, faUserGroup, faLink } from '@fortawesome/free-solid-svg-icons';

export default function Header() {
  const [modalShow, setModalShow] = useState(false);
  const [modalShow2, setWorkspaceModal1] = useState(true);
  const [modalShow3, setWorkspaceModal2] = useState(false);
  const [inputResult, setInputResult] = useState(false);
  const [open, setOpen] = useState(false);
  const handleContinue = () => { setWorkspaceModal1(false); setWorkspaceModal2(true); }

  return (
    <Navbar className='navbar-custom' bg='dark' expand="sm" >
      <Container fluid>
        <Navbar.Brand className='d-flex align-items-center' style={{ color: 'white' }} href="/"><svg className='me-2' width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M4 5C4 4.44772 4.44772 4 5 4H7C7.55228 4 8 4.44772 8 5V7C8 7.55228 7.55228 8 7 8H5C4.44772 8 4 7.55228 4 7V5ZM4 11C4 10.4477 4.44772 10 5 10H7C7.55228 10 8 10.4477 8 11V13C8 13.5523 7.55228 14 7 14H5C4.44772 14 4 13.5523 4 13V11ZM11 4C10.4477 4 10 4.44772 10 5V7C10 7.55228 10.4477 8 11 8H13C13.5523 8 14 7.55228 14 7V5C14 4.44772 13.5523 4 13 4H11ZM10 11C10 10.4477 10.4477 10 11 10H13C13.5523 10 14 10.4477 14 11V13C14 13.5523 13.5523 14 13 14H11C10.4477 14 10 13.5523 10 13V11ZM17 4C16.4477 4 16 4.44772 16 5V7C16 7.55228 16.4477 8 17 8H19C19.5523 8 20 7.55228 20 7V5C20 4.44772 19.5523 4 19 4H17ZM16 11C16 10.4477 16.4477 10 17 10H19C19.5523 10 20 10.4477 20 11V13C20 13.5523 19.5523 14 19 14H17C16.4477 14 16 13.5523 16 13V11ZM5 16C4.44772 16 4 16.4477 4 17V19C4 19.5523 4.44772 20 5 20H7C7.55228 20 8 19.5523 8 19V17C8 16.4477 7.55228 16 7 16H5ZM10 17C10 16.4477 10.4477 16 11 16H13C13.5523 16 14 16.4477 14 17V19C14 19.5523 13.5523 20 13 20H11C10.4477 20 10 19.5523 10 19V17ZM17 16C16.4477 16 16 16.4477 16 17V19C16 19.5523 16.4477 20 17 20H19C19.5523 20 20 19.5523 20 19V17C20 16.4477 19.5523 16 19 16H17Z" fill="currentColor"></path></svg> TaskMate</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <NavDropdown className='navbar-workspaces' title="Workspaces" id="navbarScrollingDropdown">
              <Card.Text className='ms-3 my-2 container-fluid'> Your Workspaces </Card.Text>
              <NavDropdown.Item>
                <Container className='navbar-workspace-link'>
                  <Row className='px-1 py-3 d-flex align-items-center'>
                    <Col lg={3}>
                      <Image className='workspace-pic' src="https://placehold.co/512x512/d9e3da/1d2125?text=S" rounded />
                    </Col>
                    <Col className='p-0'>
                      Sanan's Workspace
                    </Col>
                  </Row>
                </Container>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Container className='navbar-workspace-link'>
                  <Row className='px-1 py-3 d-flex align-items-center'>
                    <Col lg={3}>
                      <Image className='workspace-pic' src="https://placehold.co/512x512/CDD3FF/1d2125?text=T" rounded />
                    </Col>
                    <Col className='p-0'>
                      Trello Workspace
                    </Col>
                  </Row>
                </Container>
              </NavDropdown.Item>
            </NavDropdown>
            <DropdownButton className='create-dropdown ms-3' id="dropdown-basic-button" title="Create">
              <Dropdown.Item className='p-0'>
                <Card
                  bg={'dark'}
                  text={'white'}
                  style={{ width: '20rem', border: 'none', textWrap: "wrap" }}
                  className="mb-2"
                >
                  <div className='container-fluid position-relative create-button-option-wrapper mt-2'>
                    <Card.Body onClick={() => setOpen(!open)} className='create-button-option p-0 py-3 px-1 position-relative'>
                      <Card.Subtitle className='mb-2' ><FontAwesomeIcon className='me-1' icon={faBarsProgress} /> Create Board </Card.Subtitle>
                      <Card.Text>
                        A board is made up of cards ordered on lists. Use it to manage projects, track information, or organize anything.
                      </Card.Text>
                    </Card.Body>
                  </div>
                </Card>
              </Dropdown.Item>
              <Dropdown.Item className='p-0'>
                <Card
                  bg={'dark'}
                  text={'white'}
                  style={{ width: '20rem', border: 'none', textWrap: "wrap" }}
                  className="mb-2"
                >
                  <div className='container-fluid create-button-option-wrapper'>
                    <Card.Body onClick={() => setModalShow(true)} className='create-button-option p-0 py-3 px-1'>
                      <Card.Subtitle className='mb-2'><FontAwesomeIcon className='me-1' icon={faUserGroup} /> Create Workspace </Card.Subtitle>
                      <Card.Text>
                        A Workspace is a group of boards and people. Use it to organize your company, side hustle, family, or friends.
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

      <div className='position-absolute' style={{ minHeight: '150px', top: '100%', left: "20%" }}>
        <Collapse in={open} dimension="height">
          <div id="example-collapse-text">
            <Card className='create-board-card' body>
              Anim pariatur cliche reprehenderit, enim eiusmod high life
              accusamus terry richardson ad squid. Nihil anim keffiyeh
              helvetica, craft beer labore wes anderson cred nesciunt sapiente
              ea proident.
            </Card>
          </div>
        </Collapse>
      </div>

      <div>
        <Modal
          show={modalShow}
          onHide={() => { setModalShow(false); setWorkspaceModal2(false); setWorkspaceModal1(true); }}
          size="xl"
          aria-labelledby="contained-modal-title-vcenter"
          className='create-workspace-modal'
          centered
        >
          <Modal.Body className='p-0 position-relative' id="contained-modal-title-vcenter">
            <Button className='create-workspace-close btn-close position-absolute top-0 end-0 mt-5 me-4' onClick={() => setModalShow(false)}></Button>
            <Row className='p-0 d-flex flex-nowrap'>

              {modalShow2 ? <Col lg={6}>
                <div className='p-5'>
                  <Modal.Title className='fw-bold' id="contained-modal-title-vcenter">
                    Let's build a Workspace
                  </Modal.Title>
                  <p>Boost your productivity by making it easier for everyone to access boards in one location.</p>
                  <Form>
                    <Form.Group className="mb-3" controlId="create-workspace-name">
                      <Form.Label className='fw-bold'>Workspace Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Taco's Co."
                      />
                      <p className='small mt-2'>
                        This is the name of your company, team or organization.
                      </p>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="create-workspace-type">
                      <Form.Label className='fw-bold'>Workspace Type</Form.Label>
                      <Form.Select aria-label="Default select example">
                        <option>Choose...</option>
                        <option value="1">Marketing</option>
                        <option value="2">Operations</option>
                        <option value="3">Sales CRM</option>
                        <option value="4">Small Business</option>
                        <option value="5">Engineering-IT</option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group
                      className="my-3"
                      controlId="create-workspace-desc"
                    >
                      <Form.Label className='fw-bold'>Workspace Description <span className='fw-light small'>
                        Optional
                      </span></Form.Label>
                      <Form.Control as="textarea" rows={5} />
                    </Form.Group>
                  </Form>
                  <p className='small mt-2'>
                    Get your members on board with a few words about your Workspace.
                  </p>
                  <Button onClick={handleContinue} className='container create-workspace-submit' variant="primary" size="lg">
                    Continue
                  </Button>
                </div>
              </Col> : ''}

              {modalShow3 ? <Col lg={6}>
                <div className='p-5'>
                  <Modal.Title className='fw-bold' id="contained-modal-title-vcenter">
                    Invite your team
                  </Modal.Title>
                  <p>Trello makes teamwork your best work. Invite your new team members to get going!</p>
                  <Form>
                    <Form.Group className="mb-1" controlId="create-workspace-name">
                      <div className='d-flex justify-content-between'>
                        <Form.Label className='fw-bold'>Workspace members</Form.Label>
                        <a className='text-decoration-none' href="/"><FontAwesomeIcon className='me-2' icon={faLink} />Invite with link</a>
                      </div>
                      <div className='w-100 position-relative'>
                        <Form.Control
                          type="text"
                          placeholder="e.g. calrissian@cloud.ci"
                          onFocus={() => { setInputResult(true); }}
                          onBlur={() => setInputResult(false)}
                        />

                        {inputResult ? (
                          <Card className='custom-card p-3 mt-1 position-absolute w-100'>
                            <div className='d-flex align-items-center search-result'>
                              <img className='rounded-circle me-2' style={{ width: '36px', height: '36px' }} src="https://picsum.photos/200/300.jpg" alt="" />
                              <div>
                                <p className='m-0 small'>Sanan Dalbik</p>
                                <p className='m-0 small'>Hasn't logged in recently</p>
                              </div>
                            </div>
                          </Card>
                        ) : ''}
                      </div>
                    </Form.Group>
                  </Form>
                  <p className='small'>
                    <span className='fw-bold'>Pro tip!</span> Add multiple emails, or invite them with one click.
                  </p>
                  <div className='d-flex flex-column align-items-center'>
                    <Button className='container create-workspace-submit mb-1' variant="primary" size="lg">
                      Invite to Workspace
                    </Button>
                    <a className='btn btn-link text-default' onClick={() => { setModalShow(false); setWorkspaceModal2(false); setWorkspaceModal1(true); }}>I'll do this later</a>
                  </div>
                </div>
              </Col> : ''}

              <Col lg={6} className='create-workspace-right-wrapper d-flex justify-content-center align-items-center'>
                <img src="https://trello.com/assets/d1f066971350650d3346.svg" alt="" />
              </Col>
            </Row>
          </Modal.Body>
        </Modal>
      </div>
    </Navbar >
  );
}