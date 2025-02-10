import{createSlice} from "@reduxjs/toolkit";
import { auth, db } from "../firebase";
import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";


// initialState
const initialState={
    likedPosts:[], // stores liked post IDs
    unlikedPosts:[], // stores unliked post ids
    savedPosts:[], //stores saved post Ids
}

const postSlice = createSlice({
    name:"posts",
    initialState,
    reducers:{
        likePost:(state,action)=>{
            const recipeId = action.payload;
            if(!state.likedPosts.includes(recipeId)){
                state.likedPosts.push(recipeId);
                console.log("Liked recipe added in likedArray: ",recipeId)
                console.log("Current user liked array : ",state.likedPosts);          
            }

            // Remove from unlikedPosts if it was previously unliked
            state.unlikedPosts = state.unlikedPosts.filter(id => id !==recipeId)
        },

        unlikePost:(state,action)=>{
          const recipeId= action.payload;
          if(!state.unlikedPosts.includes(recipeId)){
            state.unlikedPosts.push(recipeId);
            console.log("Unliked recipe added in unlikedArray: ",recipeId)
            console.log("Current users Unliked array : ",state.unlikedPosts);
          }
          // Remove from likedPosts if it was previously liked
          state.likedPosts = state.likedPosts.filter(id => id !==recipeId)
        },

        savePost:(state,action)=>{
            const recipeId = action.payload;
            if(!state.savedPosts.includes(recipeId)){
                state.savedPosts.push(recipeId);
                console.log("Saved recipe added in savedArray: ",recipeId)
                console.log("current users saved Array",state.savedPosts);
                
            }
        },

        removeSavedPost:(state,action)=>{
            state.savedPosts = state.savedPosts.filter(id=> id !==action.payload)
            console.log("saved recipe removed : ",action.payload);
            console.log("current saved array : ",state.savedPosts);
            
        },

        syncWithDatabase:(state)=>{
            // This is a placeholder for a function that would sync the state with the database
            console.log("Syncing with database",state);

            
        }
    }
})

export const {likePost,unlikePost,savePost,removeSavedPost,syncWithDatabase} =postSlice.actions
export default postSlice.reducer;