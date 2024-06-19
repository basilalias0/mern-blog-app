import { createSlice } from '@reduxjs/toolkit'


export const AuthSlice= createSlice({
    name:"authSlice",
    initialState:{
        user:{
            name:null,
            username:null,
            email:null,
            token:null
        }
    },
    reducers:{
        loginAction:((state,action)=>{
            state.user = action.payload
        }),
        signupAction:((state,action)=>{
            state.user = action.payload
        })
    }
})

export const {loginAction,signupAction} = AuthSlice.actions

export default AuthSlice.reducer
