import React, { useEffect, useState } from 'react';
import Styles from './RegisterPage.module.css';
import { useFormik } from 'formik';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

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
            AdminId: "540c247b-3e8d-4e2c-8163-c11a62823c3d"
        },
        onSubmit: async (values) => {
            values.UserRole = selectedRole;
            try {
                const response = await axios.post('https://localhost:7101/api/AppUser/CreateUser', values, {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                });

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
                    <p className='text-center my-4 fw-bold'>Sign up to continue</p>
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
                    <Form.Group className="mb-3" controlId="create-workspace-type">
                        <Form.Select aria-label="Default select example">
                            <option value="1">Member</option>
                            <option value="2">Admin</option>
                            <option value="3">Super Admin</option>
                        </Form.Select>
                    </Form.Group>
                    <span className='w-100'>
                        <Button className='container create-workspace-submit w-100 m-0' variant="primary" size="lg">
                            Sign Up
                        </Button>
                    </span>
                    <div className='mt-3 text-center'><a className='btn-anchor' href="/SignIn">Already have an account ?</a></div>
                </div>
            </Modal.Body>
        </Modal>
        // <div className={Styles.Main}>
        //     <Grid className={Styles.MainContainer} templateColumns='repeat(12, 1fr)' gap={6}>
        //         <GridItem className={Styles.Spacer} colSpan={1}></GridItem>
        //         <GridItem className={Styles.LeftContainer} colSpan={4}>
        //             <div className={Styles.Title}>
        //                 <h1 className={Styles.MainHeader}>Create User</h1>
        //             </div>
        //             <div className={Styles.InputContainer}>
        //                 <form className={Styles.FormContainer} onSubmit={formik.handleSubmit}>
        //                     <label>Fullname</label>
        //                     <input value={formik.values.Fullname} onChange={formik.handleChange} name="Fullname" placeholder={"Enter your Fullname"} />
        //                     <label>Username</label>
        //                     <input value={formik.values.Username} onChange={formik.handleChange} name="Username" placeholder={"Enter your Username"} />
        //                     <label>Email</label>
        //                     <input value={formik.values.Email} onChange={formik.handleChange} name="Email" placeholder={"Enter your email address"} />
        //                     <label>Password</label>
        //                     <input value={formik.values.Password} onChange={formik.handleChange} name="Password" type='password' placeholder={"Enter Password"} />
        //                     <div className={Styles.formCheck}>
        //                         <input className="form-check-input" type="radio" name="Role" value="GlobalAdmin" onChange={handleCheckboxChange} checked={selectedRole === "GlobalAdmin"} />
        //                         <label className="form-check-label">
        //                             Global Admin
        //                         </label>
        //                     </div>
        //                     <div className={Styles.formCheck}>
        //                         <input className="form-check-input" type="radio" name="Role" value="Admin" onChange={handleCheckboxChange} checked={selectedRole === "Admin"} />
        //                         <label className="form-check-label">
        //                             Admin
        //                         </label>
        //                     </div>
        //                     <div className={Styles.formCheck}>
        //                         <input className="form-check-input" type="radio" name="Role" value="Member" onChange={handleCheckboxChange} checked={selectedRole === "Member"} />
        //                         <label className="form-check-label">
        //                             Member
        //                         </label>
        //                     </div>
        //                     <button type='submit' className={Styles.LoginButton}>
        //                         {formik.isSubmitting ? <CircularProgress isIndeterminate size="24px" color="teal" /> : "Register"}
        //                     </button>
        //                 </form>
        //             </div>
        //         </GridItem>
        //         <GridItem className={Styles.Spacer} colSpan={1}></GridItem>
        //         <GridItem className={Styles.RightContainer} colSpan={6}>
        //             <img src={AppImage} alt="" />
        //             <div className={Styles.userCreateRules}>
        //                 1{")"} It is not possible to create a second username with the same name and it can only contain letters and numbers, symbols are not included.<br></br>
        //                 2{")"} There must be a domain after the @ at the end of the email.<br></br>
        //                 3{")"} The password must be at least 1 letter sized, with no numbers or special symbols, and must be at least 8 chars.<br></br>
        //             </div>
        //         </GridItem>
        //     </Grid>
        //     <ChakraProvider>
        //         {isSuccess && (
        //             <Modal
        //                 show={true}
        //                 onHide={() => { setModalShow(false); }}
        //                 size="lg"
        //                 fullscreen='md-down'
        //                 aria-labelledby="contained-modal-title-vcenter"
        //                 centered
        //                 className='create-share-link-modal'
        //             >
        //                 <Modal.Body className='p-3 mb-3 position-relative' id="contained-modal-title-vcenter">
        //                     <Alert
        //                         status='success'
        //                         variant='subtle'
        //                         flexDirection='column'
        //                         alignItems='center'
        //                         justifyContent='center'
        //                         textAlign='center'
        //                         height='200px'
        //                     >
        //                         <AlertIcon boxSize='40px' mr={0} />
        //                         <AlertTitle mt={4} mb={1} fontSize='lg'>
        //                             Successfully created user
        //                         </AlertTitle>
        //                         <AlertDescription maxWidth='sm'>
        //                             The user has been successfully Created and can now login                                </AlertDescription>
        //                     </Alert>
        //                 </Modal.Body>
        //             </Modal>
        //         )}
        //         {isError && (
        //             <Modal
        //                 show={true}
        //                 onHide={() => { setModalShow(false); }}
        //                 size="lg"
        //                 fullscreen='md-down'
        //                 aria-labelledby="contained-modal-title-vcenter"
        //                 centered
        //                 className='create-share-link-modal'
        //             >
        //                 <Modal.Body className='p-3 mb-3 position-relative' id="contained-modal-title-vcenter">
        //                     <Alert status='error'>
        //                         <AlertIcon />
        //                         <AlertTitle>Could not create user</AlertTitle>
        //                         <AlertDescription>Try to recreate the user according to the rules</AlertDescription>
        //                     </Alert>
        //                 </Modal.Body>
        //             </Modal>
        //         )}
        //     </ChakraProvider>
        // </div>
    );
}
