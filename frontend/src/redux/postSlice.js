import Posts from "@/components/Posts";
import { createSlice } from "@reduxjs/toolkit";

const postSlice=createSlice({
    name:'post',
    initialState:{
        Posts:[]
    },
    reducers:{
        // actions
        setPosts:(state,action)=>{
            state.posts=action.payload;
        }
    }
})

export const {setPosts}=postSlice.actions;
export default postSlice.reducer;