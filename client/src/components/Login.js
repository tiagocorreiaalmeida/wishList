import React from "react";
import validator from "validator";
import axios from "axios";
import bcrypt from "bcrypt";

export default class Login extends React.Component {
    state = {
        login: true,
        email: "",
        error: "",
        password: "",
        repeatedPassword: "",
        successMessage: ""
    };

    encryptIt = value => {
        let salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(value, salt);
    };

    onSubmit = e => {
        e.preventDefault();
        if (!this.state.email || !this.state.password) {
            this.setState(() => ({ error: "Fill all the inputs" }));
        } else if (!validator.isEmail(this.state.email)) {
            this.setState(() => ({ error: "Invalid email" }));
        } else if (this.state.password.length < 4) {
            this.setState(() => ({
                error: "The minimum password length is 4 characters"
            }));
        }
        if (this.state.login) {
            //login request
        } else {
            if (this.state.password !== this.state.repeatedPassword) {
                this.setState(() => ({
                    error: "Passwords don't match"
                }));
            } else {
                //register request
            }
        }
    };

    onLoginClick = () => {
        this.setState(() => ({
            login: true,
            email: "",
            password: "",
            repeatedPassword: "",
            error: ""
        }));
    };

    onRegisterClick = () => {
        this.setState(() => ({
            login: false,
            email: "",
            password: "",
            repeatedPassword: "",
            error: ""
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
                        {this.state.error && <p>{this.state.error}</p>}
                        <button className="login__button">
                            <i className="ion-paper-airplane login__button__icon" />Submit
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}
