import React, { useEffect, useState } from 'react';
import Styles from './SignInPage.module.css';
import { useFormik } from 'formik';
import { login } from '../../Service/AuthService';
import { loginAction } from '../../Redux/Slices/AuthSlice';
import { useDispatch } from 'react-redux';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

export default function SignInPage() {
    const [loginError, setLoginError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const LoginFormik = useFormik({
        initialValues: {
            UsernameOrEmail: "",
            password: "",
        },
        onSubmit: (values) => {
            setIsLoading(true);
            LoginMutate(values)
        },
    });
    const { mutate: LoginMutate, isLoading: Loginloading } =
        useMutation((values) => login(values), {
            onSuccess: (resp) => {
                setIsLoading(false);
                dispatch(loginAction(resp));
                navigate("/");
            },

            onError: (error) => {
                setIsLoading(false);
                setLoginError("Invalid username or password.");
            },
        });
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
            fullscreen='lg-down'
            aria-labelledby="contained-modal-title-vcenter"
            className='sign-in-modal'
            centered
            backdrop="static"
            backdropClassName={Styles.signInModalBackdrop}
        >
            <Modal.Body className='p-0 d-flex flex-column align-items-center justify-content-center' id="contained-modal-title-vcenter">
                <div className='py-5 col-8 col-lg-10 d-flex flex-column'>
                    <Modal.Title className='fw-bold' id="contained-modal-title-vcenter">
                        <h1 style={{ color: "#579dff" }} className='text-center'><FontAwesomeIcon className={"me-2"} icon={faCircleCheck} />Task Mate</h1>
                    </Modal.Title>
                    <p className='text-center my-4 fw-bold'>Sign in to continue</p>
                    <Form className='mt-3'>
                        <Form.Group className="mb-3" controlId="create-workspace-name">
                            <Form.Control
                                type="text"
                                placeholder="Email"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="create-workspace-name">
                            <Form.Control
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Group>
                    </Form>
                    <span className='w-100'>
                        <Button className='container create-workspace-submit w-100 m-0' variant="primary" size="lg">
                            Sign In
                        </Button>
                    </span>
                    <div className='mt-3 text-center'><a className='btn-anchor' href="/CreateUser">Create an account</a></div>
                </div>
            </Modal.Body>
        </Modal>

        // <div className={Styles.Main}>
        //     <Grid className={Styles.MainContainer} templateColumns='repeat(12, 1fr)' gap={6}>
        //         <GridItem className={Styles.Spacer} colSpan={1}></GridItem>
        //         <GridItem className={Styles.LeftContainer} colSpan={4}>
        //             <div className={Styles.Title}>
        //                 <h1 className={Styles.MainHeader}>Log in your account</h1>
        //             </div>
        //             <div className={Styles.InputContainer}>
        //                 <form className={Styles.FormContainer} action="" method="get">
        //                     <label>Email</label>
        //                     <input name="UsernameOrEmail" onChange={handleInputChange} placeholder={"Enter your email address"} />
        //                 </form>
        //                 <form className={Styles.FormContainer} action="" method="get">
        //                     <label>Password</label>
        //                     <input name="password" onChange={handleInputChange} type='password' placeholder={"Enter Password"} />
        //                 </form>
        //                 <button type='submit' onClick={() => LoginFormik.handleSubmit()} className={Styles.LoginButton}>
        //                     {isLoading ? <CircularProgress isIndeterminate size="24px" color="teal" /> : "Log in"}
        //                 </button>
        //                 {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
        //             </div>
        //         </GridItem>
        //         <GridItem className={Styles.Spacer} colSpan={1}></GridItem>
        //         <GridItem className={Styles.RightContainer} colSpan={6}>
        //             <img className={Styles.Image} src={image} alt="" />
        //         </GridItem>
        //     </Grid>
        // </div>
    );
}