import React, { Component } from "react";
import axiosInstance from "./axiosApi";
import { Redirect } from "react-router";




class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            username: "", 
            password: "" ,
            redirectToReferrer: false
            
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        try {
            const response = axiosInstance.post('/auth/token/obtain/', {
                username: this.state.username,
                password: this.state.password
            });
            // console.log(response)
            response.then((response) => {
                axiosInstance.defaults.headers['Authorization'] = "JWT " + response.data;
                localStorage.setItem('access_token', response.data.access);
                localStorage.setItem('refresh_token', response.data.refresh);
                this.setState({
                    redirectToReferrer: true
                })
                return response.data;
            })
            

        } catch (error) {
            throw error;
        }
    }

    render() {
        const redirectToReferrer = this.state.redirectToReferrer;
        if (redirectToReferrer === true) {
            <Redirect to="/dashboard" />
        }
        return (
            <>
            {redirectToReferrer ? <Redirect to="/dashboard" /> : null}
            <div>
                Login
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Username:
                        <input name="username" type="text" value={this.state.username} onChange={this.handleChange} />
                    </label>
                    <label>
                        Password:
                        <input name="password" type="password" value={this.state.password} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
            </>
        )
    }
}
export default Login;