import React, { Component } from "react";
import axiosInstance from "./axiosApi";
import { Redirect } from "react-router";




class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: ''

        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        let formData = new FormData();
        var file = document.querySelector('#id_file');
        formData.append("file", file.files[0]);
        try {
            const response = axiosInstance.post('/api/upload/', formData,{
                'headers':{
                    'Content-Type':'multipart/form-data'
                }
            });
            console.log(response)
            response.then((response) => {
                axiosInstance.defaults.headers['Authorization'] = "JWT " + response.data;
                localStorage.setItem('access_token', response.data.access);
                localStorage.setItem('refresh_token', response.data.refresh);
                // axiosInstance.headers['Content-Type'] = 'multipart/form-data';
                this.setState({
                    redirectToReferrer: true
                })
                console.log(response)
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
                    <form onSubmit={this.handleSubmit} encType="multipart/form-data">
                        <label>
                            File:
                            <input type="file" name="file" required id="id_file" value={this.state.username} onChange={this.handleChange} />

                        </label>
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            </>
        )
    }
}
export default Upload;