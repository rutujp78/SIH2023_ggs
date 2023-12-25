import React, { useState } from "react";
import './Login.css';
import { Backdrop, Button, CircularProgress, TextField } from "@mui/material";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import Toaster from '../components/Toaster';
import PropTypes from 'prop-types'

function Login() {
    const [showlogin, setShowLogin] = useState(false);
    const [data, setData] = useState({ username: "", email: "", password: "" });
    const [loading, setLoading] = useState(false);

    const [logInStatus, setLogInStatus] = React.useState("");
    const [signInStatus, setSignInStatus] = React.useState();

    const navigate = useNavigate();

    const changeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const loginHandler = async (e) => {
        setLoading(true);
        console.log(data);
        try {
            const response = await fetch(`http://localhost:5000/users/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })

            const resp = await response.json();
            console.log("Login : ", resp);

            setLogInStatus({ msg: "Success", key: Math.random() });
            setLoading(false);

            const newData = JSON.stringify(resp);
            console.log(newData);
            // localStorage.setItem("userData", newData);
            // myStorage.setItem();
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
            // const config = {
            //     headers: {
            //         "Content-type": "application/json",
            //     },
            // };

            // const response = await axios.post(
            //     "http://localhost:5000/user/register/",
            //     data,
            //     config
            // );

            const response = await fetch('http://localhost:5000/users/signup', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })

            const resp = await response.json();

            console.log(resp);
            setSignInStatus({ msg: "Success", key: Math.random() });
            navigate("/home");
            localStorage.setItem("userData", JSON.stringify(resp));
            setLoading(false);
        } catch (error) {
            console.log(error);
            if (error.response.status === 405) {
                setLogInStatus({
                    msg: "User with this email ID already Exists",
                    key: Math.random(),
                });
            }
            if (error.response.status === 406) {
                setLogInStatus({
                    msg: "User Name already Taken, Please take another one",
                    key: Math.random(),
                });
            }
            setLoading(false);
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
                    <img src="" alt="Logo" className="welcome-logo" />
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
                                    // console.log(event);
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
                                    // console.log(event);
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
                                    // console.log(event);
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
                                    // console.log(event);
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
                                    // console.log(event);
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

export default Login;

Login.propTypes = {
    myStorage: PropTypes.any.isRequired,
}

// const data = [
//     {
//         name: "hehe",
//         desc: "skj;a",
//         city: "kjsdl",
//         state: "kjsd",
//         data: [
//             { labels: '12/12/2020', value: 69 },
//             { labels: '13/12/2020', value: 69 },
//         ]
//     }
// ]