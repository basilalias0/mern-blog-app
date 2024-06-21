import {BASE_URL} from '../Utils/urls'
import axios from 'axios'
axios.defaults.withCredentials = true;

export const createPostAPI = async({title,content}) =>{
    const response = await axios.post(`${BASE_URL}/post/create-post`,{
        title,
        content
    })
    return response.data
}
export const viewPostAPI = async()=>{
    const response = await axios.get(`${BASE_URL}/post/allPost`)
    return response.data
}