import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import Styles from "./SideBarMenu.module.css";
import NavDropdown from "react-bootstrap/NavDropdown";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { getDeletebyId, getbyWokrspaceInBoard } from "../../Service/BoardService.js";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router";
import { setData } from "../../Redux/Slices/WorkspaceAndBorderSlice.js";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  ChakraProvider,
} from '@chakra-ui/react'
import { Button } from "react-bootstrap";

export default function SideBarMenu() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { refresh, workspaceId, BoardId, userId } = useSelector((x) => x.Data);
  const GetId = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setData({ BoardId: GetId }));
  }, []);

  const [isMenuOpen, setMenuOpen] = useState(true);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);

  const queryClient = useQueryClient();

  const { data: byBoard, isSuccess, refetch } = useQuery(
    ["WorkspaceInBoard", workspaceId ? workspaceId : undefined],
    () => getbyWokrspaceInBoard(workspaceId),
    { enabled: !!workspaceId }
  );

  const { mutate: deleteBoardMutation } = useMutation(
    () => getDeletebyId(userId, BoardId),
    {
      onSuccess: (values) => {
        // Invalidate the query cache after successful deletion
        queryClient.invalidateQueries("WorkspaceInBoard");
      },
      onError: (err) => {},
    }
  );

  const onCloseUpdateModal = () => {
    setUpdateModalOpen(false);
  };

  const HandleSubmit = () => {
    deleteBoardMutation();
    onClose();
  };

  return (
    <>
      <Col className={[Styles.sideBarMenuWrapper, isMenuOpen ? "col-2" : ""]}>
        {isMenuOpen ? (
          <Col className={[Styles.sideBarMenu, isMenuOpen ? "col-lg-12" : ""]}>
            <div>
              <Container
                className={[
                  Styles.sideBarMenuWorkspaceName,
                  "justify-content-between px-3 align-items-center",
                ]}
                fluid
              >
                <span className="d-flex align-items-center">
                  <Image
                    className={Styles.workspacePic}
                    src="https://placehold.co/512x512/CDD3FF/1d2125?text=T"
                    rounded
                  />
                  <p className="m-0 ms-2 fw-bold">Trello Workspace</p>
                </span>
                <button
                  onClick={() => setMenuOpen(false)}
                  className={"btn btn-primary default-submit"}
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
              </Container>
              <Container className={[Styles.sideBarMenuWorkspace, "mt-2"]} fluid>
                <div className="ms-1">
                  <p className="mx-0  p-0  m-0 fw-bold">Trello Workspace</p>
                  <p className=" mx-0  p-0  m-0 small">Free</p>
                </div>

                <Card.Text className="mx-1 my-1 p-0 container-fluid">
                  {" "}
                  Your Boards{" "}
                </Card.Text>
                {byBoard?.data?.length ? (
                  byBoard.data.map((board, index) => {
                    return (
                      <NavDropdown.Item key={index}>
                        <Container onClick={() => dispatch(setData({ BoardId: board.id }))} className="p-0 m-0 navbar-workspace-link">
                          <Row className="px-2 py-2 d-flex align-items-center">
                            <Col lg={3}>
                              <Image
                                className="workspace-pic"
                                src={`https://placehold.co/512x512/d9e3da/1d2125?text=${board.title.slice(0, 1)}`}
                                rounded
                              />
                            </Col>
                            <Col className="p-0">{board.title} </Col>
                            <span>
                              <Menu>
                                <MenuButton bgColor={'transparent'}>
                                  <FontAwesomeIcon icon={faEllipsis} />
                                </MenuButton>
                                <MenuList w={"200px"} border={"#616466 1px solid"} borderRadius={4} pb={10} pt={10} gap={10} bgColor={'#1d2125 '}>
                                  <MenuItem onClick={() => onOpen()} p={"0px 12px"} _hover={{ backgroundColor: "#616466" }}>Delete Board</MenuItem>
                                  <MenuItem onClick={() => setUpdateModalOpen(true)} p={"0px 12px"} _hover={{ backgroundColor: "#616466" }}>Update Board</MenuItem>
                                </MenuList>
                              </Menu>
                            </span>
                          </Row>
                        </Container>
                      </NavDropdown.Item>
                    );
                  })
                ) : (
                  <NavDropdown.Item>No boards available</NavDropdown.Item>
                )}
              </Container>
            </div>
          </Col>
        ) : (
          <Col className={Styles.sideBarMenu}>
            <button
              onClick={() => setMenuOpen(true)}
              className="btn btn-primary default-submit m-2 mt-4"
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </Col>
        )}
      </Col>
      <ChakraProvider>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Delete Board</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Are you sure you want to delete this board?
            </ModalBody>
            <ModalFooter>
              <Button style={{ backgroundColor: "red", border: "#ffff 1px solid" }} mr={3} onClick={() => HandleSubmit()}>
                Yes
              </Button>
              <Button variant='ghost' onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Modal isOpen={isUpdateModalOpen} onClose={onCloseUpdateModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Update Board</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Update board content goes here.
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onCloseUpdateModal}>
                Save Changes
              </Button>
              <Button variant='ghost' onClick={onCloseUpdateModal}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </ChakraProvider>

    </>
  );
}
