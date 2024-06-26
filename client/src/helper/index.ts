import { axiosCoreInstance as axios } from '@/config/axios'

function login(data) {
    const baseUrl = `/api/v1/users/login`
    return axios.post(`${baseUrl}`, data);
}

function logoutUser() {
    const baseUrl = `/api/v1/users/logout`
    return axios.post(`${baseUrl}`);
}

function signUp(data) {
    const baseUrl = `/api/v1/users/`
    return axios.post(`${baseUrl}`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}

function getAllUsers() {
    const baseUrl = `/api/v1/users/`
    return axios.get(`${baseUrl}`);
}

function getUserStatsApi(id) {
    const baseUrl = `/api/v1/stats/${id}`
    return axios.get(`${baseUrl}`);
}

function updateUserStatsApi(data) {
    const baseUrl = `/api/v1/stats/`
    return axios.put(`${baseUrl}`, { body: data });
}

export { login, logoutUser, signUp, getAllUsers, getUserStatsApi, updateUserStatsApi }