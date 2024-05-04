import { axiosCoreInstance as axios } from '@/config/axios'

function signUp(data) {
    const baseUrl = `/api/v1/users/`
    return axios.post(`${baseUrl}`, data);
}

function getAllUsers() {
    const baseUrl = `/api/v1/users/`
    return axios.get(`${baseUrl}`);
}
const ans = getAllUsers()
console.log("123123", ans)
export { signUp }