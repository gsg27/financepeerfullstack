import axios from 'axios';

export default class authService {
    init = () => {
        this.setInterceptors();
    };

    setInterceptors = () => {
        axios.defaults.headers.common['Token'] = localStorage.getItem("token");
        axios.defaults.headers.common['Device'] = "device";

        axios.interceptors.response.use(response => {
            return response;
        }, err => {
            return new Promise((resolve, reject) => {
                const originalReq = err.config;
                if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
                    originalReq._retry = true;

                    let res = fetch('http://localhost:8000//auth/token/refresh/', {
                        method: 'POST',
                        mode: 'cors',
                        cache: 'no-cache',
                        credentials: 'same-origin',
                        headers: {
                            'Content-Type': 'application/json',
                            'Device': 'device',
                            'Token': localStorage.getItem("access_token")
                        },
                        redirect: 'follow',
                        referrer: 'no-referrer',
                        body: JSON.stringify({
                            token: localStorage.getItem("access_token"),
                            refresh_token: localStorage.getItem("refresh_token")
                        }),
                    }).then(res => res.json()).then(res => {
                        console.log(res);
                        this.setSession({ token: res.token, refresh_token: res.refresh });
                        originalReq.headers['Token'] = res.token;
                        originalReq.headers['Device'] = "device";


                        return axios(originalReq);
                    });


                    resolve(res);
                }


                return Promise.reject(err);
            });
        });
    };

}