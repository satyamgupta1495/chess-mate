import axios from 'axios';
import { URL } from '@/constants';

const createAxiosInstance = (url) => {
    axios.defaults.headers.post['Content-Type'] =
        'application/x-www-form-urlencoded';
    axios.defaults.baseURL = url;

    axios.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            let message;

            if (error && error.response) {
                switch (error.response.status) {
                    case 401:
                        message = {
                            message: 'Invalid credentials',
                            status: error.response.status,
                        };
                        break;
                    case 403:
                        window.location.href = '/access-denied';
                        return;  
                    case 404:
                        message = {
                            message: 'Sorry! the data you are looking for could not be found',
                            status: error.response.status,
                        };
                        break;
                    default:
                        message = {
                            message: error.response.data?.errorMsg || error.message || 'An unknown error occurred',
                            status: error.response.status,
                        };
                }
                return Promise.reject(message);
            } else {
                message = {
                    message: 'An unknown error occurred',
                    status: null,
                };
                return Promise.reject(message);
            }
        }
    );


    // axios.interceptors.request.use(  
    // interceptor code goes here
    // );

    return axios;
};
const axiosCoreInstance = createAxiosInstance(URL);
console.log("axiosCoreInstance", URL, axiosCoreInstance)
export { axiosCoreInstance };
