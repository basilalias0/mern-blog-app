import { createSlice } from '@reduxjs/toolkit'
import { userData } from '../Utils/cookieHandler'



export const AuthSlice= createSlice({
    name:"authSlice",
    initialState:{
        user:userData || null
    },
    reducers:{
        loginAction:((state,action)=>{
            state.user = action.payload
        }),
        signupAction:((state,action)=>{
            state.user = action.payload
        }),
        logoutAction:((state,action)=>{
            state.user = null
        })
    }
})

export const {loginAction,signupAction,logoutAction} = AuthSlice.actions

export default AuthSlice.reducer
