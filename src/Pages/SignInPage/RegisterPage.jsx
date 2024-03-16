import React, { useEffect, useState } from "react";
import Styles from "./RegisterPage.module.css";
import {
  Grid,
  GridItem,
  CircularProgress,
  ChakraProvider,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import AppImage from "../../Images/user-add-icon---shine-set-add-new-user-add-user-30 (1).png";
import { useFormik } from "formik";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";

export default function RegisterPage() {
  const [selectedRole, setSelectedRole] = useState("Member");
  const [modalShow, setModalShow] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const formik = useFormik({
    initialValues: {
      Fullname: "",
      Username: "",
      Email: "",
      Password: "",
      UserRole: selectedRole ? selectedRole : selectedRole,
      AdminId: "c1d6b79f-809f-4359-b4d2-0e3d6572f334",
    },
    onSubmit: async (values) => {
      values.UserRole = selectedRole;
      try {
        const response = await axios.post(
          "https://localhost:7101/api/AppUser/CreateUser",
          values,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          setIsSuccess(true);
        }
      } catch (error) {
        setIsError(true);
      }
    },
  });

  const handleCheckboxChange = (event) => {
    setSelectedRole(event.target.value);
  };

  return (
    <Modal
      show={true}
      fullscreen="lg-down"
      aria-labelledby="contained-modal-title-vcenter"
      className="sign-in-modal"
      centered
      backdrop="static"
      backdropClassName={Styles.signInModalBackdrop}
    >
      <Modal.Body
        className="p-0 d-flex flex-column align-items-center justify-content-center"
        id="contained-modal-title-vcenter"
        style={{ backgroundColor: "#1d2125" }}
      >
        <div className="py-5 col-8 col-lg-10 d-flex flex-column">
          <Modal.Title className="fw-bold" id="contained-modal-title-vcenter">
            <h1 style={{ color: "#579dff" }} className="text-center">
              <FontAwesomeIcon className={"me-2"} icon={faCircleCheck} />
              Task Mate
            </h1>
          </Modal.Title>
          <p className="text-center my-4 fw-bold">Sign up to continue</p>
          <Form className="mt-3">
            <Form.Group className="mb-1" controlId="create-workspace-name">
              <Form.Control
                className="mb-2 p-3"
                type="text"
                placeholder="Fullname"
                name="Fullname"
                onChange={formik.handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-1" controlId="create-workspace-name">
              <Form.Control
                className="mb-2 p-3"
                type="text"
                placeholder="Username"
                name="Username"
                value={formik.values.Username}
                onChange={formik.handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-1" controlId="create-workspace-name">
              <Form.Control
                className="mb-2 p-3"
                onChange={formik.handleChange}
                type="text"
                placeholder="Email"
                name="Email"
              />
            </Form.Group>
            <Form.Group className="mb-1" controlId="create-workspace-name">
              <Form.Control
                className="mb-2 p-3"
                type="password"
                placeholder="Password"
                onChange={formik.handleChange}
                name="Password"
              />
            </Form.Group>
          </Form>
          <Form.Group className="mb-1" controlId="create-workspace-type">
            <Form.Select
              className="mb-2 p-1.2"
              value="GlobalAdmin"
              onChange={formik.UserRole}
              aria-label="Default select example"
            >
              <option value="Member">Member</option>
              <option value="Admin">Admin</option>
              <option value="GlobalAdmin">Super Admin</option>
            </Form.Select>
          </Form.Group>
          <span className="w-100">
            <Button
              onClick={formik.handleSubmit}
              type="Submit"
              className="container create-workspace-submit w-100 m-0"
              variant="primary"
              size="lg"
            >
              Sign Up
            </Button>
          </span>
          <div className="mt-3 text-center">
            <a className="btn-anchor" href="/SignIn">
              Already have an account ?
            </a>
          </div>
          <div
            style={{ fontSize: "13px", paddingTop: "5px" }}
            className={Styles.userCreateRules}
          >
            1{")"} It is not possible to create a second username with the same
            name and it can only contain letters and numbers, symbols are not
            included.<br></br>2{")"} There must be a domain after the @ at the
            end of the email.<br></br>3{")"} The password must be at least 1
            letter sized, with no numbers or special symbols, and must be at
            least 8 chars.<br></br>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
