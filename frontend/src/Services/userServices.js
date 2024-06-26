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
export const updateNameAPI = async({name})=>{
    const response = await axios.put(`${BASE_URL}/user/update-name`,{
        name
    })
    return response.data
}

export const updateUsernameAPI = async({username})=>{
    const response = await axios.put(`${BASE_URL}/user/update-username`,{
        username
    })
    return response.data
}
export const updatePasswordAPI = async({oldPassword,newPassword})=>{
    const response = await axios.put(`${BASE_URL}/user/update-password`,{
        oldPassword,
        newPassword
    })
    return response.data
}

export const UserDataAPI = async(username)=>{
    const response = await axios.get(`${BASE_URL}/user/${username}`)
    return response.data
}
export const allUserAPI = async()=>{
    const response = await axios.get(`${BASE_URL}/user/all-user-data`)
    return response.data
}
export const updateProfileImgAPI = async({formData})=>{
    const response = await axios.put(`${BASE_URL}/user/profile-picture`,
        formData
    )
    return response.data
}