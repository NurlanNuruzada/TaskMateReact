import React, { useEffect, useState } from "react";
import Styles from "./SignInPage.module.css";
import { useFormik } from "formik";
import { login } from "../../Service/AuthService";
import { loginAction } from "../../Redux/Slices/AuthSlice";
import { useDispatch } from "react-redux";
import { useMutation } from "react-query";
import { useNavigate } from "react-router";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

export default function SignInPage() {
  const [loginError, setLoginError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const LoginFormik = useFormik({
    initialValues: {
      UsernameOrEmail: "",
      password: "",
    },
    onSubmit: (values) => {
      setIsLoading(true);
      LoginMutate(values);
    },
  });
  const { mutate: LoginMutate, isLoading: Loginloading } = useMutation(
    (values) => login(values),
    {
      onSuccess: (resp) => {
        setIsLoading(false);
        dispatch(loginAction(resp));
        navigate("/");
      },

      onError: (error) => {
        setIsLoading(false);
        setLoginError("Invalid username or password.");
      },
    }
  );
  const handleInputChange = (e) => {
    LoginFormik.handleChange(e);
  };
  useEffect(() => {
    if (loginError) {
      const timer = setTimeout(() => {
        setLoginError(null);
      }, 1500);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [loginError]);
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
          <p className="text-center my-4 fw-bold">Log in to continue</p>
          <Form className="mt-1">
            <Form.Group className="mb-2" controlId="create-workspace-name">
              <Form.Control
                type="text"
                placeholder="Email"
                name="UsernameOrEmail"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-1" controlId="create-workspace-name">
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
          <span className="w-100">
            <Button
              type="submit"
              onClick={() => LoginFormik.handleSubmit()}
              className="container create-workspace-submit w-100 m-0"
              variant="primary"
              size="lg"
            >
              Sign In
            </Button>
            {loginError && <p style={{ color: "red" }}>{loginError}</p>}
          </span>
          <div className="mt-1 text-center">
            <a className="btn-anchor" href="/CreateUser">
              Create an account
            </a>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
