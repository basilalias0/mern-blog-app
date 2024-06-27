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
export const viewLikesAPI = async()=>{
    const response = await axios.get(`${BASE_URL}/post/view-like`)
    return response.data
}
export const addLikeAPI = async(postId)=>{
    const response = await axios.put(`${BASE_URL}/post/${postId}/add-like`)
    return response.data
}
export const undoLikeAPI = async(postId)=>{
    const response = await axios.put(`${BASE_URL}/post/${postId}/undo-like`)
    return response.data
}
export const updatePostAPI = async({title,postId,content})=>{
    const response = await axios.put(`${BASE_URL}/post/${postId}`,{
        title,
        content
    }) 
    return response.data
}
export const deletePostAPI = async(postId)=>{
    const response = await axios.delete(`${BASE_URL}/post/${postId}`)
    return response.data
}
