import React, { useEffect, useState } from 'react';
import Styles from './SignInPage.module.css';
import { Grid, GridItem, CircularProgress } from '@chakra-ui/react';
import AppImage from '../../Images/Trello-Logo.png'
import { useFormik } from 'formik';
import { login } from '../../Service/AuthService';
import { loginAction } from '../../Redux/Slices/AuthSlice';
import { useDispatch } from 'react-redux';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router';

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
        <div className={Styles.Main}>
            <Grid className={Styles.MainContainer} templateColumns='repeat(12, 1fr)' gap={6}>
                <GridItem className={Styles.Spacer} colSpan={1}></GridItem>
                <GridItem className={Styles.LeftContainer} colSpan={4}>
                    <div className={Styles.Title}>
                        <h1 className={Styles.MainHeader}>Log in your account</h1>
                    </div>
                    <div className={Styles.InputContainer}>
                        <form className={Styles.FormContainer} action="" method="get">
                            <label>Email</label>
                            <input name="UsernameOrEmail" onChange={handleInputChange} placeholder={"Enter your email address"} />
                        </form>
                        <form className={Styles.FormContainer} action="" method="get">
                            <label>Password</label>
                            <input name="password" onChange={handleInputChange} type='password' placeholder={"Enter Password"} />
                        </form>
                        <button type='submit' onClick={() => LoginFormik.handleSubmit()} className={Styles.LoginButton}>
                            {isLoading ? <CircularProgress isIndeterminate size="24px" color="teal" /> : "Log in"}
                        </button>
                        {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
                    </div>
                </GridItem>
                <GridItem className={Styles.Spacer} colSpan={1}></GridItem>
                <GridItem className={Styles.RightContainer} colSpan={6}>
                    <img className={Styles.Image} src={AppImage} alt="" />
                </GridItem>
            </Grid>
        </div>
    );
}