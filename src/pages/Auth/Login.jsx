import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { LoginValidation } from "../../validationChecker/ValidationChecker";
import "./Auth.css";

const Login = () => {

    const { LoginGuest, isLogin: { user } } = useAuthContext();
    const [error, setError] = useState({ isError: true })
    const [loginDetail, setLoginDetail] = useState({
        email: "",
        password: ""
    });
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!error.isError) {
            LoginGuest(loginDetail);
        }
    }, [error]);

    let path = "/login";

    if (location.state !== null) {
        path = location.state.from.pathname
    };

    useEffect(() => {
        if (user) {
            navigate(path)
        }
    }, [user]);

    const submitHandler = () => {
        const error = LoginValidation(loginDetail);
        setError(error)
    };

    const inputHandler = (e) => {
        const { name, value } = e;
        setLoginDetail({ ...loginDetail, [name]: value })
    };

    return (
        <>
            <form onSubmit={e => e.preventDefault()} className="flex-center align-center">
                <div className="auth-container">
                    <h2 className="text-align">Login</h2>   
                    <section className="flex-column">
                        <label htmlFor="/">Email address
                            <input
                                onChange={e => inputHandler(e.target)}
                                value={loginDetail.email}
                                name="email"
                                className={`user-input ${error.email && "wrong-information"}`}
                                type="email"
                                placeholder="abc@gmail.com"
                            />
                        </label>
                        <label htmlFor="/">Password
                            <input
                                onChange={e => inputHandler(e.target)}
                                value={loginDetail.password}
                                name="password"
                                className={`user-input ${error.password && "wrong-information"}`}
                                type="password"
                                placeholder="*************"
                            />
                        </label>
                    </section>
                    <section className="flex justify-between">
                        <label htmlFor="/">
                            <input className="checkbox-inpt" type="checkbox" />
                            Remember me
                        </label>
                        <Link to="/Forget" className="forget-pass-link">Forget Password?</Link>
                    </section>
                    <button onClick={submitHandler} className="login-btn">Login</button>
                    <button onClick={() => {
                        setError({ isError: false });
                        setLoginDetail({
                            email: "manojkumar@gmail.com",
                            password: "manoj@12"
                        })
                    }} className="login-btn">Login as a guest</button><br />
                    <Link className="create-account-link block text-align" to="/Signup">Create New Account</Link>
                </div>
            </form>
        </>
    )
}

export { Login }



// hello brother
