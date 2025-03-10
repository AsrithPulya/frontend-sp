import axios from 'axios';
import { logMsgToConsole, logOutUser } from '../utility/constants';

export default function axiosInstance(history = null) {
    const baseURL = `http://test.sabbpe.com/api/v1/auth/`;
    // const baseURL = process.env.REACT_APP_API_ENDPOINT;
    // let headers = {};
    // Might change this to take value from local app state
    // if (localStorage.accessToken) {
    //     headers.Authorization = `Bearer ${localStorage.accessToken}`;
    // }

    const token = localStorage.getItem('access_token');
    const headers = {
        'Authorization': `Bearer ${token}` 
    }
    const axiosInstance = axios.create({
        baseURL: baseURL,
        headers
    });

    axiosInstance.interceptors.response.use(
        (response) =>{
            if (logMsgToConsole?.axios) {
                console.log('response in axios');
                console.log(response);
            }

            return new Promise((resolve, reject) => {
                resolve(response);
            })
        },
        (error) => {
            // Enable for debugging 403 and 401 responses 
            // return new Promise((resolve, reject) => {
            //     reject(error);
            // });
            if (logMsgToConsole?.axios) {
                console.log('error in axiosInstance');
                console.log(error);
            }

            // if (!error.response) {
            //     return new Promise((resolve, reject) => {                    
            //         reject(error);
            //     });
            // }

            if (error?.response?.status === 403 || error?.response?.status === 401) {
                // localStorage.clear();
                logOutUser();

                // if (window.location.pathname === defaultNoAuthRoute) {
                //     return new Promise((resolve, reject) => {
                //         reject(error);
                //     });
                // }

                // 09-05-2023: Disabled in favour of navigate() in useToken(); That should allow user to go back to the page just before login
                // if (history) {
                //     // history.push("/login"); 
                //     history.push(defaultNoAuthRoute); 
                // } else {
                //     // window.location = "/login";
                //     window.location = defaultNoAuthRoute;
                // }

            } 
            // else {
            //     return new Promise((resolve, reject) => {
            //         reject(error);
            //     });
            // }
            return new Promise((resolve, reject) => {                    
                reject(error);
            });
        }
    );
    
    return axiosInstance;
};