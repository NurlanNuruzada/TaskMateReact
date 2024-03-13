import React, { useEffect, useState } from 'react';
import Styles from './RegisterPage.module.css';
import { Grid, GridItem, CircularProgress, ChakraProvider, Alert, AlertIcon } from '@chakra-ui/react';
import AppImage from '../../Images/user-add-icon---shine-set-add-new-user-add-user-30 (1).png'
import { useFormik } from 'formik';
import axios from 'axios';

export default function RegisterPage() {
    const [selectedRole, setSelectedRole] = useState("Member");
    const [modalShow, setModalShow] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

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
            } catch (error) { }
        },
    });

    const handleCheckboxChange = (event) => {
        setSelectedRole(event.target.value);
    };

    return (
        <div className={Styles.Main}>
            <Grid className={Styles.MainContainer} templateColumns='repeat(12, 1fr)' gap={6}>
                <GridItem className={Styles.Spacer} colSpan={1}></GridItem>
                <GridItem className={Styles.LeftContainer} colSpan={4}>
                    <div className={Styles.Title}>
                        <h1 className={Styles.MainHeader}>Create User</h1>
                    </div>
                    <div className={Styles.InputContainer}>
                        <form className={Styles.FormContainer} onSubmit={formik.handleSubmit}>
                            <label>Fullname</label>
                            <input value={formik.values.Fullname} onChange={formik.handleChange} name="Fullname" placeholder={"Enter your Fullname"} />
                            <label>Username</label>
                            <input value={formik.values.Username} onChange={formik.handleChange} name="Username" placeholder={"Enter your Username"} />
                            <label>Email</label>
                            <input value={formik.values.Email} onChange={formik.handleChange} name="Email" placeholder={"Enter your email address"} />
                            <label>Password</label>
                            <input value={formik.values.Password} onChange={formik.handleChange} name="Password" type='password' placeholder={"Enter Password"} />
                            <div className={Styles.formCheck}>
                                <input className="form-check-input" type="radio" name="Role" value="GlobalAdmin" onChange={handleCheckboxChange} checked={selectedRole === "GlobalAdmin"} />
                                <label className="form-check-label">
                                    Global Admin
                                </label>
                            </div>
                            <div className={Styles.formCheck}>
                                <input className="form-check-input" type="radio" name="Role" value="Admin" onChange={handleCheckboxChange} checked={selectedRole === "Admin"} />
                                <label className="form-check-label">
                                    Admin
                                </label>
                            </div>
                            <div className={Styles.formCheck}>
                                <input className="form-check-input" type="radio" name="Role" value="Member" onChange={handleCheckboxChange} checked={selectedRole === "Member"} />
                                <label className="form-check-label">
                                    Member
                                </label>
                            </div>
                            <button type='submit' className={Styles.LoginButton}>
                                {formik.isSubmitting ? <CircularProgress isIndeterminate size="24px" color="teal" /> : "Register"}
                            </button>
                        </form>
                    </div>
                </GridItem>
                <GridItem className={Styles.Spacer} colSpan={1}></GridItem>
                <GridItem className={Styles.RightContainer} colSpan={6}>
                    <img src={AppImage} alt="" />
                </GridItem>
            </Grid>
            {isSuccess && (
                <ChakraProvider>
                    <Alert status='success'>
                        <AlertIcon />
                        Data uploaded to the server. Fire on!
                    </Alert>
                </ChakraProvider>
            )}
        </div>
    );
}
