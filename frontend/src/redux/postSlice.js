import Posts from "@/components/Posts";
import { createSlice } from "@reduxjs/toolkit";

const postSlice=createSlice({
    name:'post',
    initialState:{
        Posts:[],
        selectedPost:null,
    },
    reducers:{
        // actions
        setPosts:(state,action)=>{
            state.posts=action.payload;
        },
        setSelectedPosts:(state,action)=>{
            state.selectedPost=action.payload
        }
    }
})

export const {setPosts,setSelectedPosts}=postSlice.actions;
export default postSlice.reducer;