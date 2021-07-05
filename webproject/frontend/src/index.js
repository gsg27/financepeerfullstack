import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import history from "./history";
import axiosInstance from "./components/axiosApi";
import jwt from 'jwt-decode';

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    const originalRequest = error.config;

    if (error.response.status === 401 && originalRequest.url === axiosInstance.baseURL +'token/refresh/') {
        history.push('/')
        return Promise.reject(error);
    }

    if (error.response.data.code === "token_not_valid" &&
      error.response.status === 401 &&
      error.response.statusText === "Unauthorized") {
      const refreshToken = localStorage.getItem('refresh_token');

      if (refreshToken) {
        // const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));
        const tokenParts = jwt(refreshToken, {
          completed: true
        })

        //exp date in token is expressed in second, while now() returns milliseconds:
        const now = Math.ceil(Date.now() / 1000);
        // console.log(tokenParts.exp)     



        if (tokenParts.exp > now) {
          return axiosInstance
            .post('/auth/token/refresh/', {
              refresh: refreshToken
            })
            .then((response) => {


              localStorage.setItem('access_token', response.data.access);
              localStorage.setItem('refresh_token', response.data.refresh);

              axiosInstance.defaults.headers['Authorizations'] = "JWT " + response.data.access;
              originalRequest.headers['Authorization'] = "JWT " + response.data.access;

              return axiosInstance(originalRequest);
            })
            .catch(err => {
              console.log(err)
            });
        } else {
          console.log("Refresh token is expired", tokenParts.exp, now);
          history.push('/')
        }
      } else {
        console.log("Refresh token not available")
        history.push('/')
      }
    }

    return Promise.reject(error);
  }
);
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
