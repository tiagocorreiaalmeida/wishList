import React from "react";
import validator from "validator";
import axios from "axios";
import bcrypt from "bcryptjs";
import { connect } from "react-redux";
import { startLogin } from "../actions/auth";

class Login extends React.Component {
    state = {
        login: true,
        email: "",
        error: "",
        password: "",
        repeatedPassword: "",
        successMessage: ""
    };

    encryptIt = value => {
        let salt = process.env.REACT_APP_SALT;
        return bcrypt.hashSync(value, salt);
    };

    onSubmit = e => {
        e.preventDefault();

        let error;
        this.setState(() => ({ error: "", successMessage: "" }));
        if (!this.state.email || !this.state.password) {
            error = "Fill all the inputs before submit";
        } else if (!validator.isEmail(this.state.email)) {
            error = "Insert a valid email";
        } else if (this.state.password.length < 4) {
            error = "The minimum password length is 4 characters";
        }
        if (error) return this.setState(() => ({ error }));

        if (this.state.login) {
            axios
                .post("/api/user/login", {
                    email: this.state.email,
                    password: this.encryptIt(this.state.password)
                })
                .then(res => {
                    this.props.dispatch(startLogin(res.data));
                })
                .catch(e => {
                    let error;
                    switch (e.response.data.error) {
                        case "login-failed":
                            error =
                                "Login failed, please verify your credentials!";
                            break;
                        default:
                            error =
                                "Something went wrong please refresh the page and try again!";
                    }
                    this.setState(() => ({ error }));
                });
        } else {
            if (this.state.password !== this.state.repeatedPassword) {
                this.setState(() => ({
                    error: "The passwords don't match!"
                }));
            } else {
                axios
                    .post("/api/user/register", {
                        email: this.state.email,
                        password: this.encryptIt(this.state.password)
                    })
                    .then(res => {
                        this.setState(() => ({
                            email: "",
                            password: "",
                            repeatedPassword: "",
                            error: "",
                            successMessage: "Your account has been created!"
                        }));
                    })
                    .catch(e => {
                        let error;
                        switch (e.response.data.error) {
                            case "invalid-email":
                                error = "Insert a valid email!";
                                break;
                            case "email-exists":
                                error =
                                    "The email you filled in is allready in use!";
                                break;
                            default:
                                error =
                                    "Something went wrong please refresh the page and try again!";
                        }
                        this.setState(() => ({ error }));
                    });
            }
        }
    };

    onLoginClick = () => {
        this.setState(() => ({
            login: true,
            email: "",
            password: "",
            repeatedPassword: "",
            error: "",
            successMessage: ""
        }));
    };

    onRegisterClick = () => {
        this.setState(() => ({
            login: false,
            email: "",
            password: "",
            repeatedPassword: "",
            error: "",
            successMessage: ""
        }));
    };

    onEmailChange = e => {
        let email = e.target.value;
        this.setState(() => ({ email }));
    };

    onPasswordChange = e => {
        let password = e.target.value;
        this.setState(() => ({ password }));
    };

    onrepeatedPasswordChange = e => {
        let repeatedPassword = e.target.value;
        this.setState(() => ({ repeatedPassword }));
    };

    render() {
        return (
            <div className="login">
                <div className="login__container">
                    <div className="login__navigation">
                        <button
                            className={
                                this.state.login
                                    ? "login__navigation__button login__navigation__button--active"
                                    : "login__navigation__button"
                            }
                            onClick={this.onLoginClick}
                        >
                            <i className="ion-key login__navigation__button__icon" />
                            Login
                        </button>
                        <button
                            className={
                                !this.state.login
                                    ? "login__navigation__button login__navigation__button--active"
                                    : "login__navigation__button"
                            }
                            onClick={this.onRegisterClick}
                        >
                            <i className="ion-lock-combination login__navigation__button__icon" />
                            Register
                        </button>
                    </div>
                    <form onSubmit={this.onSubmit} className="form">
                        <div className="form__group">
                            <label htmlFor="email" className="form__label">
                                Email
                            </label>
                            <input
                                type="email"
                                placeholder="Email"
                                id="email"
                                className="form__input"
                                value={this.state.email}
                                onChange={this.onEmailChange}
                                autoFocus
                            />
                        </div>
                        <div className="form__group">
                            <label htmlFor="password" className="form__label">
                                Password
                            </label>
                            <input
                                type="password"
                                placeholder="Password (min-length:4)"
                                id="password"
                                className="form__input"
                                pattern=".{4,}"
                                value={this.state.password}
                                onChange={this.onPasswordChange}
                            />
                        </div>
                        {!this.state.login && (
                            <div className="form__group">
                                <label
                                    htmlFor="password-2"
                                    className="form__label"
                                >
                                    Repeat your password
                                </label>
                                <input
                                    type="password"
                                    placeholder="Password (min-length:4)"
                                    id="password-2"
                                    className="form__input"
                                    pattern=".{4,}"
                                    value={this.state.repeatedPassword}
                                    onChange={this.onrepeatedPasswordChange}
                                />
                            </div>
                        )}
                        {this.state.error && (
                            <p>
                                <i className="ion-android-alert" />{" "}
                                {this.state.error}
                            </p>
                        )}
                        {this.state.successMessage && (
                            <p>
                                <i className="ion-checkmark-circled" />{" "}
                                {this.state.successMessage}
                            </p>
                        )}
                        <button className="login__button">
                            <i className="ion-paper-airplane login__button__icon" />Submit
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default connect()(Login);
