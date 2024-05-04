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

            if (error && error.response && error.response.status === 404) {
                // window.location.href = '/not-found';
            } else if (error && error.response && error.response.status === 403) {
                window.location.href = '/access-denied';
            } else {
                switch (error.response.status) {
                    case 401:
                        message = {
                            message: 'Invalid credentials',
                            status: error.response.status,
                        };
                        break;
                    case 403:
                        message = {
                            message: 'Access Forbidden',
                            status: error.response.status,
                        };
                        break;
                    case 404:
                        message = {
                            message: 'Sorry! the data you are looking for could not be found',
                            status: error.response.status,
                        };
                        break;
                    default: {
                        message = {
                            message:
                                error.response && error.response.data
                                    ? error.response.data['errorMsg']
                                    : error.message || error,
                            status: error.response.status,
                        };
                    }
                }
                return Promise.reject(message);
            }
        },
    );

    // axios.interceptors.request.use(  
    // interceptor code goes here
    // );

    return axios;
};
const axiosCoreInstance = createAxiosInstance(URL);
console.log("axiosCoreInstance", URL, axiosCoreInstance)
export { axiosCoreInstance };
