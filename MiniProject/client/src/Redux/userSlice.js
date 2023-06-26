import {createSlice} from '@reduxjs/toolkit'
export const userSlice=createSlice({

    name:"users",
    initialState:{
        user:null,
        updated:false
    },
    reducers:{
        setUser: (state,action)=>{
            state.user=action.payload
        },
        setUpdated: (state)=>{
            state.updated= !state.updated
        }
    }
})


export const { setUser,setUpdated }=userSlice.actions;
