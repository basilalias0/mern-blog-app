import {BASE_URL} from '../Utils/urls'
import axios from 'axios'
axios.defaults.withCredentials = true;

export const createCommentAPI = async({content,postId}) =>{
    const response = await axios.post(`${BASE_URL}/post/${postId}/add-comment`,{
        content
    })
    return response.data
}
export const viewCommentAPI = async(postId) =>{
    const response = await axios.get(`${BASE_URL}/post/${postId}/comments`)
    return response.data
}
export const deleteCommentAPI = async({id,commentId}) =>{
    const response = await axios.delete(`${BASE_URL}/post/${id}/${commentId}`)
    return response.data
}
export const updateCommentAPI = async({id,commentId}) =>{
    const response = await axios.put(`${BASE_URL}/post/${id}/${commentId}`)
    return response.data
}
