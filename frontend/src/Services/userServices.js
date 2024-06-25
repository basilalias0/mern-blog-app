import {BASE_URL} from '../Utils/urls'
import axios from 'axios'
axios.defaults.withCredentials = true;




export const loginAPI = async({username,password})=>{
    const response = await axios.post(`${BASE_URL}/user/login`,{
        username,
        password
    },
    )
    return response.data
}
export const signupAPI = async({username,password,name,email})=>{
    const response = await axios.post(`${BASE_URL}/user/signup`,{
        username,
        password,
        name,
        email
    },
    )
    return response.data
}
export const logoutAPI = async()=>{
    const response = await axios.get(`${BASE_URL}/user/logout`)
    return response.data
}
export const updateNameAPI = async()=>{
    const response = await axios.put(`${BASE_URL}/user/`)
}