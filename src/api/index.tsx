import axios from "axios";

const http = axios.create({
    baseURL: "https://restcountries.com/v3.1/",
    timeout: 3600,
})

// Add a request interceptor
http.interceptors.request.use(function (config) {
    // Do something before request is sent

    console.log(config);

    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
http.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log(response);

    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});


export default http;