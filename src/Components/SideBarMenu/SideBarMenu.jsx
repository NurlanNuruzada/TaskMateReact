import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import Styles from "./SideBarMenu.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { getbyWokrspaceInBoard } from "../../Service/BoardService.js";
import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { useFormik } from "formik";
import { useParams } from "react-router";
import { setData } from "../../Redux/Slices/WorkspaceAndBorderSlice.js";
export default function SideBarMenu() {
  const { refresh, workspaceId ,BoardId} = useSelector((x) => x.Data)
  const GetId = useParams()
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(setData({ BoardId: GetId }))
  },[])
  const [isMenuOpen, setMenuOpen] = useState(true);
  const queryClient = useQueryClient();
  
  const { data: byBoard, isSuccess } = useQuery(
    ["WorkspaceInBoard", workspaceId ? workspaceId : undefined],
    () => getbyWokrspaceInBoard(workspaceId),
    { enabled: !!workspaceId }
  );

  return (
    <>
      <Col className={[Styles.sideBarMenuWrapper, isMenuOpen ? "col-2" : ""]}>
        {isMenuOpen ? (
          <Col
            className={[Styles.sideBarMenu, , isMenuOpen ? "col-lg-12" : ""]}
          >
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
              <Container
                className={[Styles.sideBarMenuWorkspace, "mt-2"]}
                fluid
              >
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
                        <Container className="p-0 m-0 navbar-workspace-link">
                          <Row className="px-2 py-2 d-flex align-items-center">
                            <Col lg={3}>
                              <Image
                                className="workspace-pic"
                                src={`https://placehold.co/512x512/d9e3da/1d2125?text=${board.title.slice(0, 1)}`}
                                rounded
                              />
                            </Col>
                            <Col className="p-0">{board.title}</Col>
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
              class="btn btn-primary default-submit m-2 mt-4"
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </Col>
        )}
      </Col>
    </>
  );
}
