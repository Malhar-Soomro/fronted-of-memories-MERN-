import React, { useState } from 'react'
import { Typography, Avatar, Button, Paper, Grid, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from "./Input";
import useStyles from "./styles";
import { GoogleLogin } from 'react-google-login';
import { AUTH } from '../../constants/actionTypes';
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import Icon from "./Icon"
import { signup, signin } from "../../actions/auth";


const Auth = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "" });
    const [isSignUp, setIsSignUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const classes = useStyles();


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData)

        if (isSignUp) {
            dispatch(signup(formData, navigate));
        }
        else {
            dispatch(signin(formData, navigate));
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleShowPassword = () => setShowPassword(!showPassword);

    const switchMode = () => {
        setShowPassword(false);
        setIsSignUp((prevIsSignUp) => {
            return !prevIsSignUp;
        });
    }

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;
        console.log(res)
        try {
            dispatch({ type: AUTH, data: { result, token } })
            navigate("/");
        }
        catch (error) {
            console.log(error)
        }
    }

    const googleError = () => {
        console.log("Google Sign In was unsuccessful. Try again later")
    }


    return (
        <Container component="main" maxWidth="xs">
            <Paper
                className={classes.paper}
                elevation={3}
            >
                <Avatar
                    className={classes.avatar}
                >
                    <LockOutlinedIcon />
                </Avatar>
                <Typography
                    component="h1"
                    variant="h5"
                >
                    {isSignUp ? "Sign Up" : "Sign In"}
                </Typography>
                <form
                    className={classes.form}
                    onSubmit={handleSubmit}
                >
                    <Grid
                        container
                        spacing={2}
                    >
                        {isSignUp && (
                            <>
                                <Input
                                    name="firstName"
                                    label="First Name"
                                    handleChange={handleChange}
                                    type="text"
                                    autoFocus
                                    half
                                />
                                <Input
                                    name="lastName"
                                    label="Last Name"
                                    handleChange={handleChange}
                                    type="text"
                                    half
                                />
                            </>
                        )}
                        <Input
                            name="email"
                            label="Email Address"
                            handleChange={handleChange}
                            type="email"
                        />
                        <Input
                            name="password"
                            label="Password"
                            handleChange={handleChange}
                            type={showPassword ? "text" : "password"}
                            handleShowPassword={handleShowPassword}
                        />
                        {
                            isSignUp &&
                            <Input
                                name="confirmPassword"
                                label="Confirm Password"
                                handleChange={handleChange}
                                type="password"
                            />}
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        {isSignUp ? "Sign Up" : "Sign In"}
                    </Button>
                    <GoogleLogin
                        clientId="516580457554-bslaot8l773el2g3fq1c6e1etv1pisom.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <Button
                                className={classes.googleButton} color="primary"
                                fullWidth
                                onClick={renderProps.onClick} disabled={renderProps.disabled}

                                startIcon={<Icon />}
                                variant="contained">
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleError}
                        cookiePolicy="single_host_origin"
                    />
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button
                                onClick={switchMode}
                            >
                                {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>

        </Container>
    )
}

export default Auth;