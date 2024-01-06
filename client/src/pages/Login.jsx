import React, { useState } from "react";
import './Login.css';
import { Backdrop, Button, CircularProgress, TextField } from "@mui/material";
import sihLogo from '../assets/sih_logo.png';
import { useNavigate } from "react-router-dom";
import Toaster from '../components/Toaster';
import PropTypes from 'prop-types'

function Login({ setUsername, setToken, setUserId }) {
    const [showlogin, setShowLogin] = useState(false);
    const [data, setData] = useState({ username: "", email: "", password: "" });
    const [loading, setLoading] = useState(false);

    const [logInStatus, setLogInStatus] = React.useState("");
    const [signInStatus, setSignInStatus] = React.useState();

    const navigate = useNavigate();

    const changeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const loginHandler = async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:5000/users/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })

            // Error handling
            if(response.status === 400) throw new Error("Username or password do not match");

            const resp = await response.json();

            setLogInStatus({ msg: "Success", key: Math.random() });
            setLoading(false);

            localStorage.setItem("username", resp.username);
            localStorage.setItem("token", resp.token);
            localStorage.setItem("userId", resp.userId);

            setUsername(resp.username);
            setToken(resp.token);
            setUserId(resp.userId);

            navigate("/home");

        } catch (error) {
            setLogInStatus({
                msg: "Invalid User name or Password",
                key: Math.random(),
            });
        }
        setLoading(false);
    };

    const signUpHandler = async () => {
        setLoading(true);
        try {

            const response = await fetch('http://localhost:5000/users/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })

            // Error handling stuff (Need to implement properly)
            if(response.status === 500) throw new Error({status: response.status});
            if(response.status === 405) throw new Error({status: response.status});
            if(response.status === 406) throw new Error({status: response.status});

            const resp = await response.json();

            setSignInStatus({ msg: "Success", key: Math.random() });

            localStorage.setItem("username", resp.username);
            localStorage.setItem("token", resp.token);
            localStorage.setItem("userId", resp.userId)

            setUsername(resp.username);
            setToken(resp.token);
            setUserId(resp.userId);

            setLoading(false);
            navigate("/home");

        } catch (error) {
            console.log(error)
            setLoading(false);
            if (error.status === 405) {
                setLogInStatus({
                    msg: "User with this email ID already Exists",
                    key: Math.random(),
                });
            }
            if (error.status === 406) {
                setLogInStatus({
                    msg: "User Name already Taken, Please take another one",
                    key: Math.random(),
                });
            }
            if (error.status === 500) {
                setLogInStatus({
                    msg: "Internal Server Error",
                    key: Math.random(),
                });
            }
        }
    };

    return (
        <>
            <Backdrop
                sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="secondary" />
            </Backdrop>
            <div className="login-container">
                <div className="image-container">
                    <img src={sihLogo} alt="Logo" className="welcome-logo" />
                </div>
                {showlogin && (
                    <div className="login-box">
                        <p className="login-text">Login to your Account</p>
                        <TextField
                            onChange={changeHandler}
                            id="standard-basic"
                            label="Enter User Name"
                            variant="outlined"
                            color="secondary"
                            name="username"
                            onKeyDown={(event) => {
                                if (event.code == "Enter") {
                                    loginHandler();
                                }
                            }}
                        />
                        <TextField
                            onChange={changeHandler}
                            id="outlined-password-input"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            color="secondary"
                            name="password"
                            onKeyDown={(event) => {
                                if (event.code == "Enter") {
                                    loginHandler();
                                }
                            }}
                        />
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={loginHandler}
                            isLoading
                        >
                            Login
                        </Button>
                        <p>
                            Don't have an Account ?{" "}
                            <span
                                className="hyper"
                                onClick={() => {
                                    setShowLogin(false);
                                }}
                            >
                                Sign Up
                            </span>
                        </p>
                        {logInStatus ? (
                            <Toaster key={logInStatus.key} message={logInStatus.msg} />
                        ) : null}
                    </div>
                )}
                {!showlogin && (
                    <div className="login-box">
                        <p className="login-text">Create your Account</p>
                        <TextField
                            onChange={changeHandler}
                            id="standard-basic"
                            label="Enter User Name"
                            variant="outlined"
                            color="secondary"
                            name="username"
                            helperText=""
                            onKeyDown={(event) => {
                                if (event.code == "Enter") {
                                    signUpHandler();
                                }
                            }}
                        />
                        <TextField
                            onChange={changeHandler}
                            id="standard-basic"
                            label="Enter Email Address"
                            variant="outlined"
                            color="secondary"
                            name="email"
                            onKeyDown={(event) => {
                                if (event.code == "Enter") {
                                    signUpHandler();
                                }
                            }}
                        />
                        <TextField
                            onChange={changeHandler}
                            id="outlined-password-input"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            color="secondary"
                            name="password"
                            onKeyDown={(event) => {
                                if (event.code == "Enter") {
                                    signUpHandler();
                                }
                            }}
                        />
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={signUpHandler}
                        >
                            Sign Up
                        </Button>
                        <p>
                            Already have an Account ?
                            <span
                                className="hyper"
                                onClick={() => {
                                    setShowLogin(true);
                                }}
                            >
                                Log in
                            </span>
                        </p>
                        {signInStatus ? (
                            <Toaster key={signInStatus.key} message={signInStatus.msg} />
                        ) : null
                        }
                    </div>
                )}
            </div>
        </>
    );
}

Login.propTypes = {
    setUsername: PropTypes.func.isRequired,
    setToken: PropTypes.func.isRequired,
    setUserId: PropTypes.any.isRequired,
}

export default Login;